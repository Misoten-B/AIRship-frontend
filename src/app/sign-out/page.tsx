'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';

const Page = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      logout && (await logout());
      router.replace(ROUTES.login.base);
    })();
  }, [logout, router]);

  return <div>ログアウト中...</div>;
};

export default Page;
