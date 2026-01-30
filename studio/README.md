# Sweet No. 13 – Sanity Studio

Standalone Sanity Studio for the Sweet No. 13 site. Same project and dataset as the main site; deploy separately.

## Develop

```bash
cd studio
npm install
npm run dev
```

Opens at **http://localhost:3333** by default.

## Deploy

### Option A: Sanity’s hosting (recommended)

```bash
npm run deploy
```

Follow the prompts to deploy to **sanity.studio**. Add the hosted URL to your project’s [CORS origins](https://manage.sanity.io) (e.g. `https://your-project.sanity.studio`).

### Option B: Your own host (e.g. Vercel)

```bash
npm run build
```

Then deploy the `dist/` output (or the whole `studio/` app) to Vercel/Netlify and point a subdomain (e.g. `studio.sweetnumber13.com`) to it. Add that URL to CORS origins in [manage.sanity.io](https://manage.sanity.io).
