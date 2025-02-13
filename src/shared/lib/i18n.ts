export const defaultLocale = 'ko';

export const locales = ['en', 'ko'] as const;

export type ValidLocale = (typeof locales)[number];

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  ko: '한국어',
};
