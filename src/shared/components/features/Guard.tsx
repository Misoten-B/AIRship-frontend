'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/shared/hooks/auth';

type Props = {
  children?: ReactNode;
};
export const Guard = ({ children }: Props) => {
  const { currentUser } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      route.push('/login');
    }
  }, [currentUser, route]);

  if (!currentUser) {
    return <></>;
  }

  return children;
};
