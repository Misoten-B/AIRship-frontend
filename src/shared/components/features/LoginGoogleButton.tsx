'use client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { GoogleButton } from '../common/Button';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';
import { useGetUser } from '@/shared/hooks/restapi/v1/User';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';
import { firebaseUserState } from '@/shared/lib/recoil';
import { useLoading } from '@/shared/providers/loading';

export const LoginGoogleButton = () => {
  const { push } = useRouter();
  const firebaseUser = useRecoilValue(firebaseUserState);
  const { data, mutate, error } = useGetUser(!firebaseUser?.token);
  const { loginWithGoogle, logout } = useAuth();
  const { api } = useApiClient();
  const { open, close } = useLoading();

  const { errorNotification } = useNotifications();

  const handleClick = useCallback(async () => {
    try {
      loginWithGoogle && (await loginWithGoogle());
      open();
      const d = await mutate();
      if (d) {
        push(ROUTES.arAssets.base);
      } else {
        throw true;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === '401') {
          push(ROUTES.login.base);
        }
        errorNotification('登録されていません');
      }
      logout && (await logout());
    } finally {
      close();
    }
  }, [close, errorNotification, loginWithGoogle, logout, mutate, open, push]);

  return <GoogleButton onClick={handleClick} />;
};
