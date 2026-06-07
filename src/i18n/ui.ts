export const defaultLang = 'en' as const;

export const languages = {
  en: 'English',
  pl: 'Polski',
} as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'site.name': 'Sangha',
    'site.description': 'A Buddhist sangha community website with news, events, and teachings.',

    'nav.home': 'Home',
    'nav.lamaDorje': 'Lama Dorje',
    'nav.sangha': 'Sangha',
    'nav.news': 'News',
    'nav.contact': 'Contact',

    'home.title': 'A community of practice',
    'home.intro':
      'Welcome to our sangha. We gather for meditation, teachings, and retreat under the guidance of Lama Dorje.',
    'home.latestNews': 'Latest news',
    'home.allNews': 'All news →',
    'home.noNews': 'No news yet.',
    'home.highlightBadge': 'Highlighted',
    'home.learnMore': 'Learn more →',

    'news.title': 'News',
    'news.subtitle': 'Announcements, reflections, and updates from the community.',
    'news.back': '← All news',
    'news.eventBadge': 'Event',

    'contact.title': 'Contact',
    'contact.intro': 'Reach out by email or visit us at our meeting place.',
    'contact.byEmail': 'By email',
    'contact.whereWeMeet': 'Where we meet',

    'footer.contact': 'Contact',
  },
  pl: {
    'site.name': 'Sangha',
    'site.description':
      'Strona buddyjskiej sanghi z aktualnościami, wydarzeniami i naukami.',

    'nav.home': 'Strona główna',
    'nav.lamaDorje': 'Lama Dorje',
    'nav.sangha': 'Sangha',
    'nav.news': 'Aktualności',
    'nav.contact': 'Kontakt',

    'home.title': 'Wspólnota praktyki',
    'home.intro':
      'Witamy w naszej sandze. Spotykamy się na medytacji, naukach i odosobnieniach pod kierunkiem Lamy Dordże.',
    'home.latestNews': 'Najnowsze aktualności',
    'home.allNews': 'Wszystkie aktualności →',
    'home.noNews': 'Brak aktualności.',
    'home.highlightBadge': 'Wyróżnione',
    'home.learnMore': 'Dowiedz się więcej →',

    'news.title': 'Aktualności',
    'news.subtitle': 'Ogłoszenia, refleksje i wiadomości od wspólnoty.',
    'news.back': '← Wszystkie aktualności',
    'news.eventBadge': 'Wydarzenie',

    'contact.title': 'Kontakt',
    'contact.intro':
      'Skontaktuj się z nami mailowo lub odwiedź nas w miejscu spotkań.',
    'contact.byEmail': 'E-mail',
    'contact.whereWeMeet': 'Gdzie się spotykamy',

    'footer.contact': 'Kontakt',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}
