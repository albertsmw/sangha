# Sangha website

A small static website for a Buddhist sangha page, community info, news,
and contact.

## Languages

The site is bilingual: English (`/en/...`) and Polish (`/pl/...`). The root path `/` runs a
tiny script that reads the browser's preferred language and redirects accordingly; the choice
is remembered in `localStorage` so a manual EN/PL switch sticks. Both locales are configured
in `astro.config.mjs` — flip `defaultLocale` to change which one `/` falls back to with no JS.

All content (news, the Lama Dorje page, the Sangha page) must exist in both languages. A
missing translation fails the build, not the live site. See `CONTRIBUTING.md` for the
editing flow.

## What it is

Five pages per locale, all statically generated:

- `/` — landing page with hero, highlighted item(s), 3 most recent news posts.
- `/lama-dorje` — about the teacher.
- `/sangha` — about the community, where they meet, practice schedule.
- `/news` — list of all news posts, plus per-post pages at `/news/<slug>`.
- `/contact` — email and meeting address.

Events are a type of news (`type: event` in the frontmatter, with a `location` field). They
appear in the same list and at the same URL space — `/news/<slug>` — with a small "Event"
badge. Any news item can be flagged `highlight: true` to feature it at the top of the home
page in a special card.

There is no admin UI, no database, and nothing to operate. All content is Markdown files
in this repo. Editing one means opening a pull request; merging it triggers a rebuild and
redeploy.

## How it works

**Astro** is a static-site generator. At build time it reads the Markdown content,
runs the page templates, and produces plain HTML files in `dist/`. Those files get
served by Cloudflare Pages — no server process runs at request time. That's why hosting
is free and the site is fast.

**Content collections** (`src/content.config.ts`) define the shape of a news post using a
Zod schema (type, title, date, summary, optional image, optional location for events…).
When `pnpm build` runs, Astro validates every Markdown file against its schema. A typo in
a frontmatter field fails the build before anything ships. This is the "CMS" — the schema
is the contract, and the editor experience is just creating a Markdown file in the right
folder.

**React islands.** The site is mostly plain Astro components (`.astro` files), which
ship as HTML with zero JavaScript. React is wired up via `@astrojs/react` and can be
dropped in for any future interactive piece (carousel, donation widget, etc.) using
`<Component client:load />`.

**Tailwind CSS** (v4, via the Vite plugin) handles styling. All visual choices — stone
neutral palette, serif headings, generous spacing — live as classes in the templates.

## File layout

```
src/
├── content.config.ts                Zod schemas for news + pages collections
├── content/
│   ├── news/{en,pl}/                Markdown files, one per post (both locales required)
│   └── pages/{en,pl}/               Bodies for the Lama Dorje + Sangha pages
├── i18n/
│   ├── ui.ts                        UI string dictionary + useTranslations
│   ├── utils.ts                     getLangFromUrl, switchLangUrl, localeDate
│   └── parity.ts                    Build-time check: every slug exists in every locale
├── components/
│   ├── Nav.astro                    Top nav + EN/PL switcher
│   ├── Footer.astro
│   └── HighlightedItem.astro        Featured card on the home page
├── layouts/
│   └── Base.astro                   HTML shell + SEO meta (og:title, og:image, hreflang)
└── pages/
    ├── index.astro                  Root: browser-language redirect
    └── [lang]/
        ├── index.astro              Home (highlighted items + latest news)
        ├── lama-dorje.astro         Pulls body from pages collection
        ├── sangha.astro             Pulls body from pages collection
        ├── contact.astro            Email + address
        └── news/
            ├── index.astro          List (news + events together, event badge)
            └── [...slug].astro      Detail
public/
└── images/                          Static images referenced from frontmatter
```

## Commands

```sh
pnpm install      # install dependencies (first time only)
pnpm dev          # local dev server at http://localhost:4321 with hot reload
pnpm build        # produce static site in dist/
pnpm preview      # serve the built site to double-check before deploy
```

## Deploying (Cloudflare Pages, free)

Every merge to `main` rebuilds and redeploys automatically.
The free tier covers unlimited bandwidth, custom domain, and HTTPS.

## Editing content

See `CONTRIBUTING.md` for the step-by-step on adding a news post (regular or event-type).
