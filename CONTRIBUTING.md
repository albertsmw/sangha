# Contributing content

This site has no separate CMS. News posts, events, and the static "Lama Dorje" and "Sangha"
pages live as Markdown files in the repo. To publish, open a pull request — once merged to
`main`, Cloudflare Pages rebuilds and deploys.

## Languages

The site is bilingual: English (`/en/...`) and Polish (`/pl/...`). **Every piece of content
must exist in both languages, with matching filenames.** If you add `welcome.md` under `en/`
and forget the Polish file, `pnpm build` fails with a clear error before deploy. Same for
removing one side.

## Add a news post

1. Create both files with the same filename:
   - `src/content/news/en/YYYY-MM-DD-short-slug.md`
   - `src/content/news/pl/YYYY-MM-DD-short-slug.md`
2. Frontmatter for each:

   ```md
   ---
   title: A short, clear headline
   date: 2026-06-07
   summary: One or two sentences shown in lists and link previews.
   image: /images/news/your-image.jpg   # optional
   imageAlt: Description for screen readers # optional, recommended if image is set
   ---

   Body of the post in Markdown.
   ```

3. If using an image, drop the file in `public/images/news/`. The same image file is shared
   by both language versions.
4. Open a PR. Review. Merge.

## Add an event

1. Create both files with the same filename:
   - `src/content/events/en/YYYY-MM-DD-short-slug.md`
   - `src/content/events/pl/YYYY-MM-DD-short-slug.md`
2. Frontmatter for each:

   ```md
   ---
   title: Name of the event
   date: 2026-07-15
   location: Where it happens
   summary: One or two sentences shown in lists.
   image: /images/events/your-image.jpg   # optional
   imageAlt: Description for screen readers # optional, recommended if image is set
   ---

   Body of the event description in Markdown.
   ```

3. Drop any image in `public/images/events/`.
4. Open a PR, review, merge.

## Edit a static page (Lama Dorje, Sangha)

Edit both files:

- `src/content/pages/en/lama-dorje.md` and `src/content/pages/pl/lama-dorje.md`
- `src/content/pages/en/sangha.md` and `src/content/pages/pl/sangha.md`

Frontmatter: `title` (required), `intro` (optional). Body is regular Markdown.

The Contact page (email, address) is edited in `src/pages/[lang]/contact.astro`. Its labels
("By email", "Where we meet") are translated via `src/i18n/ui.ts`.

## Add a new UI string

If you add a label to a page (e.g. "Subscribe"), add it to BOTH the `en` and `pl` sections
of `src/i18n/ui.ts`. TypeScript catches missing keys at build time.

## Switch which language is the default

Open `astro.config.mjs`, change `defaultLocale: 'en'` to `defaultLocale: 'pl'`. That's the
only change — the root redirect (`/`) and the no-JS `<meta refresh>` follow this setting.

## Local preview

```sh
pnpm install
pnpm dev
```

Open <http://localhost:4321>. You'll be redirected to `/en/` or `/pl/` based on your browser
language. Use the EN/PL switcher in the nav to override; the choice is remembered in
`localStorage`.

## Schema enforcement

`src/content.config.ts` defines required frontmatter fields. If you forget `title` or `date`,
`pnpm build` fails with a clear error. The parity check (`src/i18n/parity.ts`) additionally
fails the build if a slug exists in one language but not the other.
