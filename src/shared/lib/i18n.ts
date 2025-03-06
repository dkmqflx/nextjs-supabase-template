export const defaultLocale = 'ko';

export const locales = ['en', 'ko'] as const;

export type ValidLocale = (typeof locales)[number];

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  ko: '한국어',
};

const dictionaries = {
  en: () => import('@/shared/constants/i18n/en.json').then((module) => module.default),
  ko: () => import('@/shared/constants/i18n/ko.json').then((module) => module.default),
};

export const getDictionary = async (locale: ValidLocale) => dictionaries[locale]();
