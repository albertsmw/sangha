import { languages, type Lang } from './ui';

const locales = Object.keys(languages) as Lang[];

export function splitEntryId(id: string): { lang: Lang; slug: string } | null {
  const [first, ...rest] = id.split('/');
  if (!locales.includes(first as Lang) || rest.length === 0) return null;
  return { lang: first as Lang, slug: rest.join('/') };
}

type Entry = { id: string; data: Record<string, unknown> };

export function assertParity(
  entries: ReadonlyArray<Entry>,
  collection: string,
  options: { matchFields?: readonly string[] } = {}
): void {
  const bySlug = new Map<string, Map<Lang, Entry>>();

  for (const entry of entries) {
    const parts = splitEntryId(entry.id);
    if (!parts) {
      throw new Error(
        `[${collection}] entry "${entry.id}" is not inside a locale folder. ` +
          `Move it under one of: ${locales.map((l) => `${collection}/${l}/`).join(', ')}`
      );
    }
    if (!bySlug.has(parts.slug)) bySlug.set(parts.slug, new Map());
    bySlug.get(parts.slug)!.set(parts.lang, entry);
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

  const matchFields = options.matchFields ?? [];
  if (matchFields.length === 0) return;

  const mismatches: string[] = [];
  for (const [slug, byLang] of bySlug) {
    for (const field of matchFields) {
      const values = locales.map((l) => {
        const value = byLang.get(l)!.data[field];
        return value instanceof Date ? value.toISOString() : JSON.stringify(value);
      });
      if (new Set(values).size > 1) {
        mismatches.push(
          `  ${collection}/${slug} — field "${field}" differs: ${locales
            .map((l, i) => `${l}=${values[i]}`)
            .join(', ')}`
        );
      }
    }
  }

  if (mismatches.length > 0) {
    throw new Error(
      `[${collection}] paired entries disagree on structural fields — ` +
        `they must match across locales.\n${mismatches.join('\n')}`
    );
  }
}
