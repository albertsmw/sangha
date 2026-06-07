import { languages, type Lang } from './ui';

const locales = Object.keys(languages) as Lang[];

export function splitEntryId(id: string): { lang: Lang; slug: string } | null {
  const [first, ...rest] = id.split('/');
  if (!locales.includes(first as Lang) || rest.length === 0) return null;
  return { lang: first as Lang, slug: rest.join('/') };
}

export function assertParity(
  entries: ReadonlyArray<{ id: string }>,
  collection: string
): void {
  const bySlug = new Map<string, Set<Lang>>();

  for (const entry of entries) {
    const parts = splitEntryId(entry.id);
    if (!parts) {
      throw new Error(
        `[${collection}] entry "${entry.id}" is not inside a locale folder. ` +
          `Move it under one of: ${locales.map((l) => `${collection}/${l}/`).join(', ')}`
      );
    }
    if (!bySlug.has(parts.slug)) bySlug.set(parts.slug, new Set());
    bySlug.get(parts.slug)!.add(parts.lang);
  }

  const missing: string[] = [];
  for (const [slug, present] of bySlug) {
    for (const lang of locales) {
      if (!present.has(lang)) {
        missing.push(`src/content/${collection}/${lang}/${slug}.md`);
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[${collection}] missing translations — every entry must exist in all locales.\n` +
        `Create:\n  ${missing.join('\n  ')}`
    );
  }
}
