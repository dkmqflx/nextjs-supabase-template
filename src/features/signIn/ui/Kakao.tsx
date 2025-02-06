'use client';

import { Button } from '@/shared/ui/button';

import { useSignInWithKakao } from '../api/quries';

const Kakao = () => {
  const { mutate: signInWithKakao } = useSignInWithKakao();

  return (
    <Button variant="outline" className="w-[48%]" onClick={() => signInWithKakao()}>
      <svg
        className="mr-2 h-4 w-4"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 5.94 2 10.88c0 3.07 1.81 5.8 4.59 7.5l-1.2 3.49a.5.5 0 0 0 .71.61l3.88-2.2c.63.09 1.28.14 1.93.14 5.52 0 10-3.94 10-8.88S17.52 2 12 2z" />
      </svg>
      Kakao
    </Button>
  );
};

export default Kakao;
