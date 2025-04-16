import { getDictionary } from '@/shared/lib/i18n';
import type { ValidLocale } from '@/shared/lib/i18n';

import NaverMaps from './NaverMaps';

type Props = {
  params: { lang: ValidLocale };
};

const NaverMapWrapper = async ({ params }: Props) => {
  const dict = await getDictionary(params.lang);

  return <NaverMaps address="불정로 6" mapTitle={dict.maps.title} mapDescription={dict.maps.description} />;
};

export default NaverMapWrapper;
