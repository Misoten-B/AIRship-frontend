'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { GoogleButton } from '../common/Button';
import { ErrorNotificationData, notifications } from '../common/Feedback';
import { useAuth } from '@/shared/hooks/auth';
import { useCreateUser } from '@/shared/hooks/restapi/v1/User';
import { useLoading } from '@/shared/providers/loading';

export const SigninGoogleButton = () => {
  const router = useRouter();
  const { createUser } = useCreateUser();
  const { loginWithGoogle, logout } = useAuth();
  const { open, close } = useLoading();

  const handleClick = useCallback(async () => {
    try {
      if (!loginWithGoogle) return;
      open();
      const token = loginWithGoogle && (await loginWithGoogle());
      const res = await createUser(token);

      router.push('/cards');
    } catch (e: any) {
      e.response.status === 500 &&
        notifications.show(
          ErrorNotificationData('Error', '登録済みのアカウントです'),
        );
      logout && (await logout());
    }
    close();
  }, [close, createUser, loginWithGoogle, logout, open, router]);

  return <GoogleButton onClick={handleClick} />;
};
