'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/shared/hooks/auth';

const Page = () => {
  const { logout } = useAuth();
  const route = useRouter();

  useEffect(() => {
    (async () => {
      logout && (await logout());
      route.push('/login');
    })();
  }, [logout, route]);

  return <></>;
};

export default Page;
