# Contributing content

This site has no separate CMS. News posts and events live as Markdown files in the repo.
To publish, open a pull request — once merged to `main`, Cloudflare Pages rebuilds and deploys.

## Add a news post

1. Create `src/content/news/YYYY-MM-DD-short-slug.md`.
2. Use this frontmatter:

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

3. If using an image, drop the file in `public/images/news/`.
4. Open a PR. Get a second pair of eyes on it. Merge.

## Add an event

1. Create `src/content/events/YYYY-MM-DD-short-slug.md`.
2. Use this frontmatter:

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

## Static pages

- `src/pages/lama-dorje.astro` — edit the inline content directly.
- `src/pages/sangha.astro` — edit the inline content directly.
- `src/pages/contact.astro` — edit email and address directly.

## Local preview

```sh
pnpm install
pnpm dev
```

Open <http://localhost:4321>.

## Schema enforcement

`src/content.config.ts` defines required frontmatter fields. If you forget `title` or `date`,
`pnpm build` fails with a clear error before deploy. That's intentional — it stops broken posts
from going live.
