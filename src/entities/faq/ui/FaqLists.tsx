import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqListsProps = {
  faqs: FaqItem[];
};

const FaqLists = ({ faqs }: FaqListsProps) => {
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
