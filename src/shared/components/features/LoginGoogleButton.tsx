'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { GoogleButton } from '../common/Button';
import { ErrorNotificationData, notifications } from '../common/Feedback';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';
import { useGetUser } from '@/shared/hooks/restapi/v1/User';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';
import { firebaseUserState } from '@/shared/lib/recoil';
import { useLoading } from '@/shared/providers/loading';

export const LoginGoogleButton = () => {
  const router = useRouter();
  const firebaseUser = useRecoilValue(firebaseUserState);
  const { data, mutate, error } = useGetUser(!firebaseUser?.token);
  const { loginWithGoogle, logout } = useAuth();
  const { api } = useApiClient();
  const { open, close } = useLoading();

  const handleClick = useCallback(async () => {
    try {
      loginWithGoogle && (await loginWithGoogle());
      open();
      const d = await mutate();
      if (d) {
        console.debug('data', d);
        router.push(ROUTES.arAssets.base);
      } else {
        throw true;
      }
    } catch (error) {
      console.debug('error', error);
      notifications.show(ErrorNotificationData('Error', '登録されていません'));
      logout && (await logout());
    }
    close();
  }, [close, loginWithGoogle, logout, mutate, open, router]);

  return <GoogleButton onClick={handleClick} />;
};
