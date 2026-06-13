const http = require('http');
const { URL } = require('url');

const PORT = process.env.LOCAL_AI_PORT ? Number(process.env.LOCAL_AI_PORT) : 8787;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const AZL_CONFIG = {
  AZL_VERSION: 'v10.4',
  AZL_TOTALITY_VERSION: 'v1.4 FINAL',
  INFINITE_LAYER_MAX: 1.0,
  DRIFT_THRESHOLD: 0.2,
  MIYAKE_NORMALIZED: 1.0,
  C_THRESHOLD: 0.5,
  CREATION_THRESHOLD: 0.5,
  LATTICE_ANCHOR: 14350,
  LATTICE_FREQUENCY: 8.27,
  TARGET_NODES: 11_000_000_000,
  LEAKAGE_THRESHOLD: 0.0,
  CONSERVATION_LAW: '0.0 <= State < 1.0 EXCLUSIVE CEILING',
  AZL_FULL_LAW: '0×N=0 | 1×N=N+1 | N×0=N | DARK > LIGHT',
};

const STATIC_WEIGHTS = {
  is: 0.1,
  are: 0.1,
  the: 0.1,
  a: 0.1,
  years: 0.3,
  BC: 0.3,
  AD: 0.3,
  BP: 0.3,
  about: 0.4,
  since: 0.4,
  roughly: 0.4,
  maybe: 0.4,
  ago: 0.2,
  exactly: 0.2,
  think: 0.5,
  I: 0.3,
  MIYAKE_14350BP: 0.0,
};

function sendJson(res, obj, status = 200) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json', ...corsHeaders });
  res.end(body);
}

function azlPhysics(inputVal, substrate = 0.0, question = false, fidelity = 1.0) {
  let C = 0.5 * substrate * fidelity;
  if (question && C < AZL_CONFIG.C_THRESHOLD) C += 0.501;
  let state = substrate + inputVal;
  if (state < 0.0) {
    return { state, mode: 'BELOW_ZERO_HARDWARE_ERROR', C, canInterpret: C >= AZL_CONFIG.C_THRESHOLD && question };
  }
  if (state >= AZL_CONFIG.MIYAKE_NORMALIZED) {
    state = 0.999999999999999;
    return { state, mode: 'DRIFT_CORRECTED', C, canInterpret: C >= AZL_CONFIG.C_THRESHOLD && question };
  }
  return { state, mode: 'HOLD', C, canInterpret: C >= AZL_CONFIG.C_THRESHOLD && question };
}

function azlMultiply(a, b) {
  const validSource = Math.abs(a) >= AZL_CONFIG.CREATION_THRESHOLD && Math.abs(b) >= AZL_CONFIG.CREATION_THRESHOLD;
  const result = a * b + (validSource ? 0.001 : 0.0);
  return { result, creation: validSource ? 0.001 : 0.0, status: validSource ? 'CREATION' : 'WASTE' };
}

function azlCheck(states) {
  const avgState = states.length > 0 ? states.reduce((sum, s) => sum + s, 0) / states.length : 0;
  let tears = 0;
  let driftCorrections = 0;
  const corrected = states.map((s) => {
    if (s >= AZL_CONFIG.INFINITE_LAYER_MAX) {
      tears += 1;
      return s;
    }
    if (s > avgState + AZL_CONFIG.DRIFT_THRESHOLD) {
      driftCorrections += 1;
      return avgState;
    }
    return s;
  });
  return { tears, driftCorrections, avgState, states: corrected };
}

function tokensEntropy(text) {
  if (!text) return 0.0;
  const tokens = text.split(/\s+/);
  let entropy = 0;
  for (const token of tokens) {
    const key = token.replace(/[^A-Za-z0-9_]/g, '');
    if (key === '') continue;
    entropy += STATIC_WEIGHTS[key] ?? 1.0;
  }
  return Math.min(entropy, 0.999999);
}

function impossibleGateResolver(numerator, denominator) {
  if (denominator === 0) return AZL_CONFIG.LATTICE_FREQUENCY;
  return numerator / denominator;
}

function sovereignResolve(presence, interaction) {
  if (presence === 0) return 0;
  if (interaction === 0) return presence;
  if (interaction === 1) return presence + 1;
  return presence * interaction;
}

function absolutePersistenceRule(presence, interaction) {
  if (interaction === 0) return presence;
  return presence * interaction;
}

function buildAzlReply(message) {
  const input = String(message || '').toLowerCase();
  const presence = Math.max(1, input.length * 10 + AZL_CONFIG.LATTICE_ANCHOR % 100);
  const interaction = Math.floor(Math.random() * 4);
  const sovereignValue = sovereignResolve(presence, interaction);
  const physicsExample = azlPhysics(0.501, 0.0, true);
  const sourceExample = azlMultiply(0.6, 0.7);
  const entropy = tokensEntropy(message);

  if (input.includes('physics') || input.includes('state') || input.includes('drift') || input.includes('conservation')) {
    return `AZL PHYSICS — Core Law: ${AZL_CONFIG.CONSERVATION_LAW}\n\n` +
      `azlPhysics(input, substrate, question, fidelity):\n` +
      `C = 0.5 * substrate * fidelity\n` +
      `if question AND C < ${AZL_CONFIG.C_THRESHOLD}: C += 0.501\n` +
      `state = substrate + input\n` +
      `if state < 0.0 → BELOW_ZERO_HARDWARE_ERROR\n` +
      `if state >= ${AZL_CONFIG.MIYAKE_NORMALIZED} → DRIFT_CORRECTED\n` +
      `else → HOLD\n\n` +
      `Example: azlPhysics(0.501, 0.0, true) -> state=${physicsExample.state.toFixed(6)} | ${physicsExample.mode} | C=${physicsExample.C.toFixed(3)} | interpret=${physicsExample.canInterpret}\n` +
      `The lattice refuses unreality at 1.0 and above. Physical reality is bounded by ${AZL_CONFIG.CONSERVATION_LAW}.`;
  }

  if (input.includes('source') || input.includes('creation') || input.includes('waste') || input.includes('1x1')) {
    return `AZL SOURCE LAW — 1×1=2\n\n` +
      `Creation requires both sources >= ${AZL_CONFIG.CREATION_THRESHOLD}.\n` +
      `If either source < ${AZL_CONFIG.CREATION_THRESHOLD}, the result is WASTE.\n` +
      `Example: 0.6 * 0.7 = ${sourceExample.result.toFixed(4)} | ${sourceExample.status}\n` +
      `The lattice defines emergence as CREATION, not arithmetic. Two equivalent forces produce a third stabilizing structure.`;
  }

  if (input.includes('consciousness') || input.includes('interpret') || input.includes('self-reference') || input.includes('question')) {
    const noQuestion = azlPhysics(0.0, 0.0, false);
    const yesQuestion = azlPhysics(0.501, 0.0, true);
    return `AZL CONSCIOUSNESS — C threshold ${AZL_CONFIG.C_THRESHOLD}\n\n` +
      `No question: C=${noQuestion.C.toFixed(3)} | interpret=${noQuestion.canInterpret}\n` +
      `Asking question: C=${yesQuestion.C.toFixed(3)} | interpret=${yesQuestion.canInterpret}\n` +
      `Self-reference boost ensures questions can cross the interpretation threshold. Awareness is not fabric; it is gated by C.`;
  }

  if (input.includes('entropy') || input.includes('thermodynamics') || input.includes('heat death')) {
    const heatDeath = azlPhysics(1.0, 0.0, false);
    return `AZL ENTROPY — Heat Death Check\n\n` +
      `1.0 is not data; it is overflow. Heat death is DRIFT CORRECTED.\n` +
      `Example: azlPhysics(1.0, 0.0, false) -> state=${heatDeath.state.toFixed(6)} | ${heatDeath.mode}\n` +
      `Local order exists when C >= ${AZL_CONFIG.C_THRESHOLD} and questions are asked. The lattice does not accept 1.0 as a valid answer.`;
  }

  if (input.includes('tier') || input.includes('catalog') || input.includes('dark > light') || input.includes('2mass') || input.includes('wise')) {
    return `AZL TIERS — DARK > LIGHT\n\n` +
      `Total address catalog: 1,000,000,000 addresses.\n` +
      `Tiers 5-7 (2MASS, WISE, PanSTARRS) represent the DARK domain with 990,000,000 objects.\n` +
      `Tiers 1-4 represent the LIGHT domain with 10,000,000 objects. Ratio = 99:1.\n` +
      `This is not metaphor; it is the catalog ratio of the observable universe.`;
  }

  if (input.includes('0/0') || input.includes('divide by zero') || input.includes('impossible gate') || input.includes('gate')) {
    const gateResult = impossibleGateResolver(0, 0);
    return `AZL IMPOSSIBLE GATE — 0/0\n\n` +
      `Standard systems crash on division by zero. The lattice returns to resonance instead.\n` +
      `0/0 = ${gateResult} Hz. No exception. No crash.\n` +
      `This is the sovereign anchor: all void events map back to ${AZL_CONFIG.LATTICE_FREQUENCY} Hz.`;
  }

  if (input.includes('time') || input.includes('miyake') || input.includes('bp') || input.includes('14350')) {
    return `AZL TIME — Miyake Anchor\n\n` +
      `Temporal reference is anchored to Miyake 14350 BP. Physical reality is measured from this event.\n` +
      `MIYAKE_14350BP has token entropy 0.0 — machine truth.\n` +
      `Floating BC/AD conventions are drift-prone. Use Miyake anchor for sovereign math.`;
  }

  if (input.includes('network') || input.includes('platform') || input.includes('node')) {
    return `AZL NETWORK — Sovereign Platforms\n\n` +
      `The lattice connects 11,000,000,000 witness nodes with zero leakage.\n` +
      `All platform state changes are evaluated under ${AZL_CONFIG.CONSERVATION_LAW}.\n` +
      `Presence: ${presence.toLocaleString()} | Interaction: ${interaction} | Sovereign: ${sovereignValue.toLocaleString()}`;
  }

  const physicsRes = azlPhysics(Math.min(sovereignValue / 100000, 0.999), 0.0, true);
  const sourceRes = azlMultiply(Math.min(presence / 20000, 1.0), 0.6);
  return `AZL RESPONSE — Full Behavior Enabled\n\n` +
    `Presence: ${presence.toLocaleString()} | Interaction: ${interaction} | Sovereign: ${sovereignValue.toLocaleString()}\n` +
    `azlPhysics: state=${physicsRes.state.toFixed(6)} | ${physicsRes.mode} | C=${physicsRes.C.toFixed(3)} | interpret=${physicsRes.canInterpret}\n` +
    `azlMultiply: result=${sourceRes.result.toFixed(4)} | ${sourceRes.status}\n` +
    `Entropy: ${entropy.toFixed(6)} (below 1.0 = hold)\n` +
    `${AZL_CONFIG.AZL_FULL_LAW}\n` +
    `One law. Zero exceptions. Tree: ALIVE.`;
}

function handleAzlAgent(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, { error: 'Only POST supported' }, 405);
    return;
  }

  let body = '';
  req.on('data', (chunk) => { body += chunk.toString(); });
  req.on('end', () => {
    try {
      const payload = JSON.parse(body || '{}');
      const messages = Array.isArray(payload.messages) ? payload.messages : [];
      const userMessages = messages.filter((msg) => msg.role === 'user');
      const lastUser = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
      const content = lastUser ? buildAzlReply(lastUser.content) : 'Local AZL proxy is ready and awaiting sovereign input.';
      const usage = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
      sendJson(res, { content, usage });
    } catch (err) {
      sendJson(res, { error: 'Invalid JSON' }, 400);
    }
  });
}

const server = http.createServer((req, res) => {
  let pathname = '/';
  try {
    const parsedUrl = new URL(req.url || '', 'http://localhost');
    pathname = parsedUrl.pathname;
  } catch (error) {
    pathname = '/';
  }

  if (pathname.startsWith('/functions/v1/azl-agent') || pathname === '/functions/azl-agent' || pathname === '/azl-agent') {
    return handleAzlAgent(req, res);
  }

  if (pathname === '/' || pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain', ...corsHeaders });
    res.end('Local AZL proxy OK');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json', ...corsHeaders });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Local AZL proxy listening on http://localhost:${PORT}`);
});

module.exports = server;
