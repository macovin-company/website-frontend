# Macovin frontend

Company site for [Macovin](https://github.com/loraxx753/macovin).
Meanwhile is the factory; this repo is the people-facing front door.

## What this is

A thin React + TypeScript site (Webpack, Tailwind, hash router) shaped like
[Meanwhile](https://github.com/MeanwhileJS/meanwhile): page components with a
static `path`, `cn` utility, and Atoms / Molecules / Organisms folders.

Pages:

- **Home** (`#/`) - who we are, what we build, Meanwhile as factory
- **Work** (`#/work`) - Shimmering Stars (shipped MVP) + elder care + Texas workers' rights via `GET /api/examples` (static fallback if API is down)
- **About** (`#/about`) - name once, story-first, clock as proof
- **Contact** (`#/contact`) - `POST /api/contact`, mailto fallback if API is down or unset

## Run locally

```bash
npm install
npm run dev
```

Dev server: [http://localhost:5173](http://localhost:5173)

In development, webpack defaults `MACOVIN_API_BASE_URL` to
`http://localhost:3001` (macovin-backend). Start the API in another terminal:

```bash
cd ../macovin-backend
npm install && npm run dev
```

```bash
npm run build   # production bundle → dist/
npm start       # serve dist/ (uses PORT, default 3000)
npm run serve   # local static preview on 4173
npm run lint
```

## Deploy (Railway / Railpack)

Webpack is not an auto-detected SPA framework, so Railpack needs an explicit
start (or SPA output dir). This repo ships both:

1. **`npm start`** serves `dist/` with [`serve`](https://www.npmjs.com/package/serve) on `PORT` (Railway sets this).
2. **`Staticfile`** points `root` at `dist` for Railpack SPA / Caddy mode.

`railway.json` sets build → `npm run build` and start → `npm run start`.

### Env vars on Railway (frontend service)

| Variable | Required? | Notes |
| --- | --- | --- |
| `PORT` | set by Railway | Bound by `start` |
| `MACOVIN_API_BASE_URL` | **yes for live contact/examples** | Backend public HTTPS origin, no trailing slash (e.g. `https://YOUR-BACKEND.up.railway.app`). Baked in at **build** time; redeploy after changing. Empty → mailto + static examples only. |
| `RAILPACK_SPA_OUTPUT_DIR` | optional | Set to `dist` to force Railpack Caddy SPA mode. If set, you can clear a custom start command in the dashboard and let Railpack serve `dist` |

Do **not** set `RAILPACK_STATIC_FILE_ROOT` for this Node app (wrong provider; causes the same “no start command” failure).

### Custom domain (`macovin.com`)

Attach `macovin.com` / `www.macovin.com` in Railway → Settings → Public Networking → Custom Domain, then add the **exact** CNAME + TXT Railway shows at your DNS provider. Apex needs ALIAS/ANAME or CNAME flattening (not a static A record). Full checklist: see the project store doc `docs/macovin-domain-setup.md` (coordinator / Kevin).

Backend must allow the site origins via `CORS_ORIGINS` (see macovin-backend).

Local production check:

```bash
npm run build && npm start
```

## Env: `MACOVIN_API_BASE_URL`

Point this at macovin-backend (no trailing slash).

| Value | Behavior |
| --- | --- |
| `http://localhost:3001` | Local API: contact + examples |
| `https://YOUR-BACKEND.up.railway.app` | Production API (set on Railway frontend service, then redeploy) |
| empty / unset | Mailto for contact; static example blurbs on Work |

Production: set `MACOVIN_API_BASE_URL` on the **frontend** Railway service to the backend’s public HTTPS URL, then redeploy so webpack bakes it in.

```bash
cp .env.example .env
# or one-shot:
MACOVIN_API_BASE_URL=http://localhost:3001 npm run dev
```

If the API is down, contact opens a mailto draft and Work shows the offline
copy. The site stays shippable either way.

Backend CORS defaults already allow `http://localhost:5173`. If you change the
dev port, add it to the backend `CORS_ORIGINS` list.

## Notes

- Do not invent prices, dates, or bridge amounts on the site.
- Example work pages are clearly marked as ideas, not live products.
- Voice matches Macovin company docs: contractions, plain sentences, no em dashes.
