'use client';

import { usePathname, useRouter } from 'next/navigation';

import { type ValidLocale, localeNames, locales } from '@/shared/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

const LanguageSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = pathname?.split('/')[1] as ValidLocale;

  const handleChange = (newLocale: ValidLocale) => {
    if (!currentLang || !locales.includes(currentLang)) return;

    const newPathname = pathname?.replace(`/${currentLang}`, `/${newLocale}`);
    router.push(newPathname ?? '/');
  };

  // 현재 언어가 유효하지 않으면 렌더링하지 않음
  if (!currentLang || !locales.includes(currentLang)) return null;

  return (
    <Select defaultValue={currentLang} onValueChange={handleChange}>
      <SelectTrigger className="mr-2 w-[120px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>

      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitch;
