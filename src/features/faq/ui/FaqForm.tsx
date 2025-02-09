'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

const FaqForm = () => {
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email and complaint to your backend
    console.log('Submitted:', { email, complaint });
    // Reset form fields
    setEmail('');
    setComplaint('');
    setCharacterCount(0);
    alert("Your complaint has been submitted. We'll get back to you soon.");
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
          Your Email
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="complaint" className="mb-2 block text-sm font-medium">
          Your Question or Complaint
        </label>
        <Textarea
          id="complaint"
          value={complaint}
          onChange={handleComplaintChange}
          placeholder="Please describe your issue or question..."
          required
          maxLength={500}
          className="min-h-[200px] resize-none"
        />
        <p className="mt-1 text-sm text-gray-500">{characterCount}/500 characters</p>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FaqForm;
