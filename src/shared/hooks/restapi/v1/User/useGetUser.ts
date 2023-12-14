'use client';
import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetUser = (disabled: boolean) => {
  const { api } = useApiClient();
  return useSWR(
    disabled ? undefined : api?.v1.users.myprofile.$path(),
    () => api?.v1.users.myprofile.$get(),
  );
};
