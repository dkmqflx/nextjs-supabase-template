import React from 'react';

import { Button } from '@/shared/ui/button';

const Naver = () => {
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const REDIRECT_URI = encodeURIComponent(process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI!);

  const loginWithNaver = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=random_string`;
  };

  return (
    <Button variant="outline" className="w-full" onClick={loginWithNaver}>
      Naver
    </Button>
  );
};

export default Naver;
