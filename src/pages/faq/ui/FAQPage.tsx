import { FaqLists } from '@/entities/faq';
import { FaqForm } from '@/features/faq';
import { getDictionary } from '@/shared/lib/i18n';
import type { ValidLocale } from '@/shared/lib/i18n';

const FAQPage = async ({ params: { lang } }: { params: { lang: ValidLocale } }) => {
  const dict = await getDictionary(lang);

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">{dict.faq.pageTitle}</h1>
      <p className="mb-8 text-gray-600">{dict.faq.pageDescription}</p>

      <FaqLists faqs={dict.faq.faqs} />

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">{dict.faq.formTitle}</h2>
        <p className="mb-6 text-gray-600">{dict.faq.formDescription}</p>
        <FaqForm faq={dict.faq} />
      </div>
    </div>
  );
};

export default FAQPage;
