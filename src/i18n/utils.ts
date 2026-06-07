import { defaultLang, languages, type Lang } from './ui';

export function isLang(value: string): value is Lang {
  return value in languages;
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return isLang(segment) ? segment : defaultLang;
}

export function switchLangUrl(url: URL, target: Lang): string {
  const segments = url.pathname.split('/');
  if (segments.length > 1 && isLang(segments[1])) {
    segments[1] = target;
  } else {
    segments.splice(1, 0, target);
  }
  return segments.join('/') || `/${target}/`;
}

export function localeDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(date);
}
