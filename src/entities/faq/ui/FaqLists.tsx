import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unused items in their original packaging.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping typically takes 3-5 business days for domestic orders and 7-14 days for international orders.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to most countries worldwide. Shipping costs and times may vary depending on the destination.',
  },
  // Add more FAQ items as needed
];

const FaqLists = () => {
  return (
    <Accordion type="single" collapsible className="mb-8">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqLists;
