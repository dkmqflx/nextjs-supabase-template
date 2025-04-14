import Link from 'next/link';

import { type ValidLocale, getDictionary } from '@/shared/lib/i18n';
import { Button } from '@/shared/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang as ValidLocale);

  const mainPages = [
    {
      href: `/${lang}/user`,
      label: dict.pages.user.title,
      description: dict.pages.user.description,
    },
    {
      href: `/${lang}/faq`,
      label: dict.faq.pageTitle,
      description: dict.faq.pageDescription,
    },
    {
      href: `/${lang}/maps`,
      label: dict.maps.title,
      description: dict.maps.description,
    },
    {
      href: `/${lang}/infinite-scroll`,
      label: dict.pages.infiniteScroll.title,
      description: dict.pages.infiniteScroll.description,
    },
    {
      href: `/${lang}/storage`,
      label: dict.storage.title,
      description: dict.storage.title,
    },
    {
      href: `/${lang}/error-handling`,
      label: dict.pages.errorHandling.title,
      description: dict.pages.errorHandling.description,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">{dict.home.title}</h1>
        <p className="mb-8 text-lg text-muted-foreground">{dict.home.description}</p>

        <div className="grid gap-4 md:grid-cols-2">
          {mainPages.map((page) => (
            <Link key={page.href} href={page.href} className="transition-colors">
              <Card className="h-full hover:bg-muted/50">
                <CardHeader>
                  <CardTitle>{page.label}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                  <Button variant="ghost" className="mt-4">
                    {lang === 'ko' ? '페이지로 이동 →' : 'Go to page →'}
                  </Button>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
