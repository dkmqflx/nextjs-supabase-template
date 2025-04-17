import { ClientErrorButton, ServerErrorButton } from '@/features/error-handling/indes';

const ErrorHandling = () => {
  return (
    <div>
      <ServerErrorButton />
      <ClientErrorButton />
    </div>
  );
};

export default ErrorHandling;
