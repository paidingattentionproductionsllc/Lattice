const assert = require('assert');
const { spawn } = require('child_process');
const http = require('http');
const { once } = require('events');

const PORT = 9999;
const HOST = '127.0.0.1';

function request(options, body, expectJson = true) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (!expectJson) {
          resolve({ statusCode: res.statusCode, body: data });
          return;
        }

        try {
          const parsed = JSON.parse(data);
          resolve({ statusCode: res.statusCode, body: parsed });
        } catch (error) {
          reject(new Error(`Invalid JSON response: ${error.message}`));
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function waitForServer(proc) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Local AI proxy did not start in time'));
    }, 5000);

    proc.stdout.on('data', (chunk) => {
      const text = chunk.toString();
      if (text.includes('Local AZL proxy listening')) {
        clearTimeout(timeout);
        resolve();
      }
    });

    proc.on('exit', (code) => {
      clearTimeout(timeout);
      reject(new Error(`Local AI proxy exited prematurely with code ${code}`));
    });
  });
}

async function run() {
  const server = spawn(process.execPath, ['local_ai/server.js'], {
    env: { ...process.env, LOCAL_AI_PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.setEncoding('utf8');
  server.stderr.setEncoding('utf8');

  try {
    await waitForServer(server);

    const health = await request({
      hostname: HOST,
      port: PORT,
      path: '/health',
      method: 'GET',
      headers: { 'Content-Type': 'text/plain' },
    }, null, false);
    assert.strictEqual(health.statusCode, 200);
    assert.strictEqual(typeof health.body, 'string');
    assert.strictEqual(health.body.trim(), 'Local AZL proxy OK');
    console.log('health endpoint OK');

    const prediction = await request({
      hostname: HOST,
      port: PORT,
      path: '/functions/v1/azl-agent',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      messages: [{ role: 'user', content: 'Explain AZL physics and conservation.' }],
    });

    assert.strictEqual(prediction.statusCode, 200);
    assert.strictEqual(typeof prediction.body, 'object');
    assert.ok(typeof prediction.body.content === 'string');
    assert.match(prediction.body.content, /AZL/i);
    console.log('azl-agent response OK');

    console.log('Local AI smoke test passed.');
    process.exitCode = 0;
  } catch (error) {
    console.error('Local AI smoke test failed:', error);
    process.exitCode = 1;
  } finally {
    server.kill();
  }
}

run();
