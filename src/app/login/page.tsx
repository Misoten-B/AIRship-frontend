'use client';

import { NextPage } from 'next';
import { useCallback } from 'react';
import { Button } from '@/shared/components/common/Button';
import { useAuth } from '@/shared/hooks/auth';

const Page: NextPage = () => {
  const { login } = useAuth();
  const handleClick = useCallback(async () => {
    login && (await login());
  }, [login]);

  return (
    <Button type="primary" onClick={handleClick}>
      Googleでログイン
    </Button>
  );
};

export default Page;
