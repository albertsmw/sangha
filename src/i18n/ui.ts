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
    'nav.sangha': 'Community',
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
    'contact.intro':
      'We are a young sangha still finding our feet in Kraków. For now, the easiest way to reach us and stay in touch is through our WhatsApp community group — join us there to ask questions, meet other practitioners, and hear about upcoming sessions and gatherings.',
    'contact.whatsapp': 'WhatsApp community group',
    'contact.whatsappCta': 'Join the group',
    'contact.moreSoon':
      'More contact options will be added as the sangha grows.',

    'footer.contact': 'Contact',
  },
  pl: {
    'site.name': 'Sangha',
    'site.description':
      'Strona buddyjskiej sanghi z aktualnościami, wydarzeniami i naukami.',

    'nav.home': 'Strona główna',
    'nav.lamaDorje': 'Lama Dorje',
    'nav.sangha': 'Społeczność',
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
      'Jesteśmy młodą sanghą, która dopiero się tworzy w Krakowie. Na ten moment najprostszym sposobem, aby się z nami skontaktować i pozostać w kontakcie, jest nasza grupa społecznościowa na WhatsAppie — dołącz do nas, aby zadawać pytania, poznać innych praktykujących i być na bieżąco z nadchodzącymi sesjami i spotkaniami.',
    'contact.whatsapp': 'Grupa społecznościowa na WhatsAppie',
    'contact.whatsappCta': 'Dołącz do grupy',
    'contact.moreSoon':
      'Wraz z rozwojem sanghi pojawią się kolejne formy kontaktu.',

    'footer.contact': 'Kontakt',
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}
