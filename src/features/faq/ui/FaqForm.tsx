'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { toast } from 'sonner';

import { sendEmail } from '../api/actions';

type FaqFormProps = {
  faq: {
    emailLabel: string;
    complaintLabel: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    characterCount: string;
    sending: string;
    placeholder: string;
    emailPlaceholder: string;
  };
};

const FaqForm = ({ faq }: FaqFormProps) => {
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendEmail({
        from: email,
        subject: 'New FAQ/Complaint Submission',
        message: complaint,
      });

      toast.success(faq.successMessage);

      // Reset form
      setEmail('');
      setComplaint('');
      setCharacterCount(0);
    } catch (error) {
      toast.error(faq.errorMessage);
      console.error('Email send error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplaintChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setComplaint(text);
      setCharacterCount(text.length);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {faq.emailLabel}
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={faq.emailPlaceholder}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="complaint" className="mb-2 block text-sm font-medium">
          {faq.complaintLabel}
        </label>
        <Textarea
          id="complaint"
          value={complaint}
          onChange={handleComplaintChange}
          placeholder={faq.placeholder}
          required
          maxLength={500}
          className="min-h-[200px] resize-none"
          disabled={isLoading}
        />
        <p className="mt-1 text-sm text-gray-500">
          {characterCount}/500 {faq.characterCount}
        </p>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? faq.sending : faq.submitButton}
      </Button>
    </form>
  );
};

export default FaqForm;
