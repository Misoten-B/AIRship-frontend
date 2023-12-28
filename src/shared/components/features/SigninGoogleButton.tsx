'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { GoogleButton } from '../common/Button';
import { ErrorNotificationData, notifications } from '../common/Feedback';
import { useAuth } from '@/shared/hooks/auth';
import { useCreateUser } from '@/shared/hooks/restapi/v1/User';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';
import { firebaseUserState } from '@/shared/lib/recoil';
import { useLoading } from '@/shared/providers/loading';

export const SigninGoogleButton = () => {
  const router = useRouter();
  const { createUser } = useCreateUser();
  const { login, logout } = useAuth();
  const { api } = useApiClient();
  const firebaseUser = useRecoilValue(firebaseUserState);
  const { open, close } = useLoading();

  const handleClick = useCallback(async () => {
    try {
      if (!login) return;
      open();
      const token = login && (await login());
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
  }, [close, createUser, login, logout, open, router]);

  return <GoogleButton onClick={handleClick} />;
};
