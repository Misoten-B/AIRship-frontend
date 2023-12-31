'use client';

import { useCallback } from 'react';
import { Button } from '@/shared/components/common/Button';
import { useAuth } from '@/shared/hooks/auth';

export const LoginButton = () => {
  const { loginWithGoogle } = useAuth();
  const handleClick = useCallback(async () => {
    loginWithGoogle && (await loginWithGoogle());
  }, [loginWithGoogle]);

  return (
    <>
      <Button onClick={handleClick}>Googleでログイン</Button>
    </>
  );
};
