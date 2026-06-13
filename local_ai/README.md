Local AZL AI Proxy

Local development proxy for the Supabase `azl-agent` function.

This server now implements the AZL physics, source law, entropy rules, and gateway behavior directly in `local_ai/server.js` so you can develop locally without deploying the Supabase function.

Usage:

1. Start the proxy:

```bash
pnpm run start:ai
```

2. Point your app's Supabase functions base URL to the proxy by setting environment variables:

```bash
export EXPO_PUBLIC_SUPABASE_URL=http://localhost:8787
export EXPO_PUBLIC_SUPABASE_ANON_KEY=anon
pnpm start
```

3. The app should send requests to `/functions/v1/azl-agent`, and the proxy will return AZL-governed responses.

Notes:
- This proxy is for local development.
- For production, deploy `supabase/functions/azl-agent` and configure `ONSPACE_AI_API_KEY` and `ONSPACE_AI_BASE_URL`.
