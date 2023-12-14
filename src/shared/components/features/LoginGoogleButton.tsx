'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { GoogleButton } from '../common/Button';
import { ErrorNotificationData, notifications } from '../common/Feedback';
import { useAuth } from '@/shared/hooks/auth';
import { useGetUser } from '@/shared/hooks/restapi/v1/User';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';
import { firebaseUserState } from '@/shared/lib/recoil';

export const LoginGoogleButton = () => {
  const router = useRouter();
  const firebaseUser = useRecoilValue(firebaseUserState);
  const { data, mutate, error } = useGetUser(!firebaseUser?.token);
  const { login, logout } = useAuth();
  const { api } = useApiClient();

  const handleClick = useCallback(async () => {
    try {
      login && (await login());
      const d = await mutate();

      if (d) {
        console.debug('data', d);
        router.push('/cards');
      } else {
        throw true;
      }
    } catch (error) {
      notifications.show(ErrorNotificationData('Error', '登録されていません'));
      logout && (await logout());
    }
  }, [login, logout, mutate, router]);

  return <GoogleButton onClick={handleClick} />;
};
