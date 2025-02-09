import { FaqLists } from '@/entities/faq';
import { FaqForm } from '@/features/faq';

const FAQPage = () => {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h1>

      <FaqLists />

      <FaqForm />
    </div>
  );
};

export default FAQPage;
