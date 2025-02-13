import type { ValidLocale } from '@/shared/lib/i18n';
import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
};

export const getDictionary = async (locale: ValidLocale) => dictionaries[locale]();
