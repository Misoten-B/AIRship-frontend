'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { GoogleButton } from '../common/Button';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';
import { useCreateUser } from '@/shared/hooks/restapi/v1/User';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { useLoading } from '@/shared/providers/loading';

export const SigninGoogleButton = () => {
  const router = useRouter();
  const { createUser } = useCreateUser();
  const { loginWithGoogle, logout } = useAuth();
  const { open, close } = useLoading();
  const { errorNotification } = useNotifications();

  const handleClick = useCallback(async () => {
    try {
      if (!loginWithGoogle) return;
      open();
      const token = await loginWithGoogle();
      await createUser(token);
      router.push(ROUTES.arAssets.base);
    } catch (e: any) {
      e.response.status === 500 &&
        errorNotification('登録済みのアカウントです');
      logout && (await logout());
    }
    close();
  }, [
    close,
    createUser,
    errorNotification,
    loginWithGoogle,
    logout,
    open,
    router,
  ]);

  return <GoogleButton onClick={handleClick} />;
};
