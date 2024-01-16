'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';
import { useCreateUser } from '@/shared/hooks/restapi/v1/User';
import { useNotifications } from '@/shared/hooks/useNotifications';

export const EmailSignIn = () => {
  const { currentUser, loginWithEmail, logout } = useAuth();
  const { createUser } = useCreateUser();
  const { errorNotification } = useNotifications();

  const router = useRouter();

  useEffect(() => {
    if (!!currentUser?.token) return;
    (async () => {
      try {
        if (!loginWithEmail) return;
        const token = await loginWithEmail();
        await createUser(token);
        router.push(ROUTES.arAssets.base);
      } catch (e: any) {
        e.response.status === 500 &&
          errorNotification('登録済みのアカウントです');
        logout && (await logout());
      }
    })();
  }, [
    createUser,
    currentUser?.token,
    errorNotification,
    loginWithEmail,
    logout,
    router,
  ]);

  return <></>;
};
