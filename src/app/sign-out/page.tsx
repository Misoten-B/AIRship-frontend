'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/shared/hooks/auth';
import { ROUTES } from '@/shared/types/Page';

const Page = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      logout && (await logout());
      router.replace(ROUTES.login);
    })();
  }, [logout, router]);

  return <div>ログアウト中...</div>;
};

export default Page;
