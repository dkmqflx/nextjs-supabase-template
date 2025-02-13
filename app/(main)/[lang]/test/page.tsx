import type { ValidLocale } from '@/shared/lib/i18n';

import { getDictionary } from '../dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: ValidLocale } }) {
  const dict = await getDictionary(lang);

  return (
    <>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
    </>
  );
}
