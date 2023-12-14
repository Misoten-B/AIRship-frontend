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

export const SigninGoogleButton = () => {
  const router = useRouter();
  const { createUser } = useCreateUser();
  const { login, logout } = useAuth();
  const { api } = useApiClient();
  const firebaseUser = useRecoilValue(firebaseUserState);

  const handleClick = useCallback(async () => {
    try {
      if (!login) return;
      const token = await login();
      login && (await login());
      const res = await createUser(token);

      router.push('/cards');
    } catch (e: any) {
      e.response.status === 500 &&
        notifications.show(
          ErrorNotificationData('Error', '登録済みのアカウントです'),
        );
      logout && (await logout());
    }
  }, [createUser, login, logout, router]);

  return <GoogleButton onClick={handleClick} />;
};
