# Deploying to Netlify

Quick guide for deploying the Balochistan E-Auction platform to Netlify.

---

## 🚀 Option 1: Deploy via Netlify UI (Easiest)

1. Push your code to a Git provider (GitHub / GitLab / Bitbucket).
2. Go to <https://app.netlify.com/start> and **"Import from Git"**.
3. Select the repo. Netlify will read `netlify.toml` automatically.
4. Confirm settings (already pre-filled from config):
   - **Base directory:** `auction-house-hub`
   - **Build command:** `npm run build`
   - **Publish directory:** `auction-house-hub/dist/client`
5. Click **Deploy site**. Done!

---

## ⚡ Option 2: Deploy via Netlify CLI

```bash
# Install the CLI once
npm install -g netlify-cli

# From the repo root
netlify login           # one-time browser auth
netlify init            # links the local project to a new/existing site
netlify deploy          # preview deploy (no production)
netlify deploy --prod   # production deploy
```

---

## 🧪 Local Preview (Like Netlify)

To run a build and serve it like Netlify would:

```bash
cd auction-house-hub
npm run build
npm run preview
```

Or use Netlify Dev for closer parity:

```bash
netlify dev   # uses [dev] block in netlify.toml
```

---

## 📁 Files in this repo

| File | Purpose |
|------|---------|
| `netlify.toml` | Main build config, redirects, headers, contexts |
| `public/_redirects` | SPA fallback (so deep links work) |
| `.nvmrc` | Pins Node 20 for consistent builds |

---

## 🔐 Environment Variables

Set these in **Site settings → Build & deploy → Environment** on Netlify if needed:

| Key | Example | Notes |
|-----|---------|-------|
| `VITE_API_URL` | `https://api.eauction.gov.pk` | Backend API endpoint |
| `VITE_PSID_GATEWAY` | `https://1bill.pk/...` | Payment gateway URL |

All client-exposed env vars must be prefixed with `VITE_`.

---

## 🐛 Troubleshooting

**Build fails with "command not found":**
- Make sure `NODE_VERSION = "20"` in `[build.environment]` matches your local Node.
- If using `pnpm` instead of `npm`, update the command in `netlify.toml`.

**Pages 404 on refresh (e.g. `/plates/p1`):**
- The SPA redirect rule should handle this. Verify `public/_redirects` is being copied to `dist/client/_redirects` after build.

**Static assets missing:**
- Publish dir should be `dist/client` (where Vite outputs the client bundle).
- If your build outputs elsewhere, update `publish` in `netlify.toml`.

---

## 🏗 Build Output Reference

After running `npm run build` you should see something like:

```
dist/
├── client/                ← This is what gets deployed
│   ├── index.html
│   ├── assets/
│   │   ├── *.js
│   │   └── *.css
│   └── _redirects         ← Copied from public/
└── server/                ← SSR entry (not deployed for static hosting)
```

---

## 📊 Cache Strategy

Configured in `netlify.toml`:

- **Hashed assets** (`/assets/*`, `*.js`, `*.css`, `*.woff2`) → 1-year immutable cache
- **`index.html`** → always re-validated (`max-age=0`)
- **Other paths** → default

This gives users instant page loads on revisits while ensuring they always see the latest deployment.

---

## 🛡 Security Headers (Already Set)

- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — denies geolocation/mic/camera

---

Need help? Email `support@eauction.gov.pk` or check the [Netlify Docs](https://docs.netlify.com).
