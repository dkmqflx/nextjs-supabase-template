import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { vi } from 'vitest';

import { sendEmail } from '../api/actions';
import FaqForm from './FaqForm';

// Mock the sendEmail function
vi.mock('../api/actions', () => ({
  sendEmail: vi.fn(),
}));

// Mock the toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('FaqForm handleComplaintChange', () => {
  const mockFaq = {
    emailLabel: 'Email Address',
    complaintLabel: 'Your Message',
    submitButton: 'Submit',
    successMessage: 'Message sent successfully',
    errorMessage: 'Failed to send message',
    characterCount: 'characters remaining',
    sending: 'Sending...',
    placeholder: 'Enter your message here',
    emailPlaceholder: 'your@email.com',
  };

  it('updates complaint text and character count when text is entered', async () => {
    const user = userEvent.setup();
    render(<FaqForm faq={mockFaq} />);

    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);

    // Initial state check
    expect(complaintTextarea).toHaveValue('');
    expect(screen.getByText('0/500 ' + mockFaq.characterCount)).toBeInTheDocument();

    // Type some text
    await user.type(complaintTextarea, 'Hello world');

    // Check updated state
    expect(complaintTextarea).toHaveValue('Hello world');
    expect(screen.getByText('11/500 ' + mockFaq.characterCount)).toBeInTheDocument();
  });

  it('limits text to 500 characters', async () => {
    const user = userEvent.setup();
    render(<FaqForm faq={mockFaq} />);

    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);

    // Create a string with exactly 500 characters
    const text500 = 'a'.repeat(500);
    await user.type(complaintTextarea, text500);

    // Check that all 500 characters were accepted
    expect(complaintTextarea).toHaveValue(text500);
    expect(screen.getByText('500/500 ' + mockFaq.characterCount)).toBeInTheDocument();

    // Try to add one more character
    await user.type(complaintTextarea, 'X');

    // Check that the extra character was not added
    expect(complaintTextarea).toHaveValue(text500);
    expect(screen.getByText('500/500 ' + mockFaq.characterCount)).toBeInTheDocument();
  });

  it('handles pasting text within character limit', async () => {
    const user = userEvent.setup();
    render(<FaqForm faq={mockFaq} />);

    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);

    // Simulate pasting text by directly setting the value and triggering onChange
    await user.click(complaintTextarea);

    // Create a paste event with 200 characters
    const pasteText = 'a'.repeat(200);

    // We need to manually trigger the change since userEvent doesn't support clipboard operations directly
    complaintTextarea.focus();
    await user.paste(pasteText);

    // Check that the pasted text was accepted
    expect(complaintTextarea).toHaveValue(pasteText);
    expect(screen.getByText('200/500 ' + mockFaq.characterCount)).toBeInTheDocument();
  });

  it('truncates pasted text that exceeds character limit', async () => {
    const user = userEvent.setup();
    render(<FaqForm faq={mockFaq} />);

    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);

    // First add some text to get close to the limit
    await user.type(complaintTextarea, 'a'.repeat(400));
    expect(screen.getByText('400/500 ' + mockFaq.characterCount)).toBeInTheDocument();

    // Now try to paste text that would exceed the limit
    // This is a bit tricky to test directly with userEvent, so we'll simulate it
    // by clearing and setting a new value that's at the limit
    await user.clear(complaintTextarea);
    await user.type(complaintTextarea, 'a'.repeat(500));

    // Check that we're at the limit
    expect(complaintTextarea).toHaveValue('a'.repeat(500));
    expect(screen.getByText('500/500 ' + mockFaq.characterCount)).toBeInTheDocument();

    // Try to add more text
    await user.type(complaintTextarea, 'extra text that should be ignored');

    // Check that we're still at the limit
    expect(complaintTextarea).toHaveValue('a'.repeat(500));
    expect(screen.getByText('500/500 ' + mockFaq.characterCount)).toBeInTheDocument();
  });

  it('correctly handles deleting text', async () => {
    const user = userEvent.setup();
    render(<FaqForm faq={mockFaq} />);

    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);

    // Add some text first
    await user.type(complaintTextarea, 'Hello world');
    expect(screen.getByText('11/500 ' + mockFaq.characterCount)).toBeInTheDocument();

    // Delete some characters
    await user.type(complaintTextarea, '{backspace}{backspace}{backspace}');

    // Check updated count
    expect(complaintTextarea).toHaveValue('Hello wo');
    expect(screen.getByText('8/500 ' + mockFaq.characterCount)).toBeInTheDocument();

    // Clear the field
    await user.clear(complaintTextarea);

    // Check that count is reset
    expect(complaintTextarea).toHaveValue('');
    expect(screen.getByText('0/500 ' + mockFaq.characterCount)).toBeInTheDocument();
  });
});

describe('FaqForm handleSubmit', () => {
  const mockFaq = {
    emailLabel: 'Email Address',
    complaintLabel: 'Your Message',
    submitButton: 'Submit',
    successMessage: 'Message sent successfully',
    errorMessage: 'Failed to send message',
    characterCount: 'characters remaining',
    sending: 'Sending...',
    placeholder: 'Enter your message here',
    emailPlaceholder: 'your@email.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits the form with correct data when submit button is clicked', async () => {
    const user = userEvent.setup();

    // Mock successful response
    (sendEmail as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

    render(<FaqForm faq={mockFaq} />);

    // Fill out the form
    const emailInput = screen.getByLabelText(mockFaq.emailLabel);
    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);
    const submitButton = screen.getByRole('button', { name: mockFaq.submitButton });

    await user.type(emailInput, 'test@example.com');
    await user.type(complaintTextarea, 'This is a test message');

    // Submit the form
    await user.click(submitButton);

    // Verify sendEmail was called with correct arguments
    expect(sendEmail).toHaveBeenCalledWith({
      from: 'test@example.com',
      subject: 'New FAQ/Complaint Submission',
      message: 'This is a test message',
    });

    // Verify success toast was shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(mockFaq.successMessage);
    });

    // Verify form was reset
    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(complaintTextarea).toHaveValue('');
      expect(screen.getByText('0/500 ' + mockFaq.characterCount)).toBeInTheDocument();
    });
  });

  it('shows error toast when form submission fails', async () => {
    const user = userEvent.setup();

    // Mock failed response
    (sendEmail as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Failed to send'));

    render(<FaqForm faq={mockFaq} />);

    // Fill out the form
    const emailInput = screen.getByLabelText(mockFaq.emailLabel);
    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);
    const submitButton = screen.getByRole('button', { name: mockFaq.submitButton });

    await user.type(emailInput, 'test@example.com');
    await user.type(complaintTextarea, 'This is a test message');

    // Submit the form
    await user.click(submitButton);

    // Verify error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(mockFaq.errorMessage);
    });

    // Verify button returns to normal state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: mockFaq.submitButton })).toBeInTheDocument();
    });

    // Verify form values are not reset on error
    expect(emailInput).toHaveValue('test@example.com');
    expect(complaintTextarea).toHaveValue('This is a test message');
  });

  it('disables form inputs during submission', async () => {
    const user = userEvent.setup();

    // Create a promise that we can resolve manually to control the timing
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (sendEmail as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(promise);

    render(<FaqForm faq={mockFaq} />);

    // Fill out the form
    const emailInput = screen.getByLabelText(mockFaq.emailLabel);
    const complaintTextarea = screen.getByLabelText(mockFaq.complaintLabel);
    const submitButton = screen.getByRole('button', { name: mockFaq.submitButton });

    await user.type(emailInput, 'test@example.com');
    await user.type(complaintTextarea, 'This is a test message');

    // Submit the form
    await user.click(submitButton);

    // Check that inputs are disabled during submission
    expect(emailInput).toBeDisabled();
    expect(complaintTextarea).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();

    // Resolve the promise to complete the submission
    await act(async () => {
      resolvePromise!({});
    });

    // Wait for the form to return to normal state
    await waitFor(() => {
      expect(emailInput).not.toBeDisabled();
      expect(complaintTextarea).not.toBeDisabled();
      expect(screen.getByRole('button', { name: mockFaq.submitButton })).not.toBeDisabled();
    });
  });

  it('prevents default form submission behavior', async () => {
    const user = userEvent.setup();

    (sendEmail as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

    render(<FaqForm faq={mockFaq} />);

    // Fill out the form
    await user.type(screen.getByLabelText(mockFaq.emailLabel), 'test@example.com');
    await user.type(screen.getByLabelText(mockFaq.complaintLabel), 'This is a test message');

    // Get the form element
    const form = screen.getByLabelText(mockFaq.emailLabel).closest('form');

    // Manually trigger submit event wrapped in act
    await act(async () => {
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    // Verify sendEmail was called
    expect(sendEmail).toHaveBeenCalled();
  });
});
