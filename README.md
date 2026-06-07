# Sangha website

A small static website for a Buddhist sangha — Lama Dorje page, community info, news,
events, and contact. Built to be cheap (free hosting), fast to develop, and editable by a
handful of developers without a separate CMS.

## Languages

The site is bilingual: English (`/en/...`) and Polish (`/pl/...`). The root path `/` runs a
tiny script that reads the browser's preferred language and redirects accordingly; the choice
is remembered in `localStorage` so a manual EN/PL switch sticks. Both locales are configured
in `astro.config.mjs` — flip `defaultLocale` to change which one `/` falls back to with no JS.

All content (news, events, the Lama Dorje page, the Sangha page) must exist in both
languages. A missing translation fails the build, not the live site. See `CONTRIBUTING.md`
for the editing flow.

## What it is

Six pages per locale, all statically generated:

- `/` — landing page with hero, 3 most recent news items, 3 next upcoming events.
- `/lama-dorje` — about the teacher.
- `/sangha` — about the community, where they meet, practice schedule.
- `/news` — list of all news posts, plus per-post pages at `/news/<slug>`.
- `/events` — upcoming + past events, plus per-event pages at `/events/<slug>`.
- `/contact` — email and meeting address.

There is no admin UI, no database, and nothing to operate. News and events are Markdown
files in this repo. Editing one means opening a pull request; merging it triggers a
rebuild and redeploy.

## How it works

**Astro** is a static-site generator. At build time it reads the Markdown content,
runs the page templates, and produces plain HTML files in `dist/`. Those files get
served by Cloudflare Pages — no server process runs at request time. That's why hosting
is free and the site is fast.

**Content collections** (`src/content.config.ts`) define the shape of a news post and an
event using a Zod schema (title, date, summary, optional image…). When `pnpm build` runs,
Astro validates every Markdown file against its schema. A typo in a frontmatter field
fails the build before anything ships. This is the "CMS" — the schema is the contract,
and the editor experience is just creating a Markdown file in the right folder.

**React islands.** The site is mostly plain Astro components (`.astro` files), which
ship as HTML with zero JavaScript. React is wired up via `@astrojs/react` and can be
dropped in for any future interactive piece (carousel, donation widget, etc.) using
`<Component client:load />`. Right now nothing on the site needs React on the client, so
the bundle is essentially empty.

**Tailwind CSS** (v4, via the Vite plugin) handles styling. All visual choices — stone
neutral palette, serif headings, generous spacing — live as classes in the templates.

## File layout

```
src/
├── content.config.ts          Zod schemas for the news + events collections
├── content/
│   ├── news/                  Markdown files, one per post
│   └── events/                Markdown files, one per event
├── components/
│   ├── Nav.astro              Top nav, list of links lives here
│   └── Footer.astro
├── layouts/
│   └── Base.astro             HTML shell + SEO meta (og:title, og:image, etc.)
└── pages/
    ├── index.astro            Home
    ├── lama-dorje.astro       Static content
    ├── sangha.astro           Static content
    ├── contact.astro          Static content
    ├── news/
    │   ├── index.astro        List page
    │   └── [...slug].astro    Detail page (one route per Markdown file)
    └── events/
        ├── index.astro
        └── [...slug].astro
public/
└── images/                    Static images referenced from Markdown frontmatter
```

## Commands

```sh
pnpm install      # install dependencies (first time only)
pnpm dev          # local dev server at http://localhost:4321 with hot reload
pnpm build        # produce static site in dist/
pnpm preview      # serve the built site to double-check before deploy
```

## Deploying (Cloudflare Pages, free)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: Pages → "Connect to Git" → pick the repo.
3. Set build command `pnpm build`, build output `dist/`.
4. Every merge to `main` rebuilds and redeploys automatically.

The free tier covers unlimited bandwidth, custom domain, and HTTPS.

## Editing content

See `CONTRIBUTING.md` for the step-by-step on adding a news post or event.

## Adding donations later

Two options, both work without changing the framework or hosting:

- **Stripe Payment Link** — make one in the Stripe dashboard, drop `<a href="...">Donate</a>`
  in the layout. Zero new infrastructure.
- **Stripe Checkout via a serverless function** — `pnpm astro add cloudflare`, switch the
  output to `'hybrid'`, add one API route that creates a Checkout session. The static
  pages continue to be served statically; only the donation endpoint runs on Cloudflare's
  Worker runtime (still free tier).
