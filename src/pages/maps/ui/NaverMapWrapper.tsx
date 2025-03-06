import { getDictionary } from '@/shared/lib/i18n';
import type { ValidLocale } from '@/shared/lib/i18n';

import NaverMaps from './NaverMaps';

const NaverMapWrapper = async ({
  params: { lang },
  address = '불정로 6',
}: {
  params: { lang: ValidLocale };
  address?: string;
}) => {
  const dict = await getDictionary(lang);

  return <NaverMaps address={address} mapTitle={dict.maps.title} mapDescription={dict.maps.description} />;
};

export default NaverMapWrapper;
