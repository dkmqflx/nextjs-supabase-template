'use client';

import { Button } from '@/shared/ui/button';

import { useRequestClientError } from '../api/error-handling-query';

const ClientErrorButton = () => {
  const { mutate } = useRequestClientError();

  const handleClick = () => {
    throw new Error('This is a test error');
  };

  return (
    <div>
      <Button onClick={handleClick}>ClientErrorButton</Button>;
      <Button onClick={() => mutate()}>ClientErrorButton2</Button>;
    </div>
  );
};

export default ClientErrorButton;
