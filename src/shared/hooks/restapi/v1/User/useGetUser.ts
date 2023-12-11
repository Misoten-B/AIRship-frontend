import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetUser = (userId: string) => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.users._user_id(userId).$path(),
    () => api?.v1.users._user_id(userId).$get(),
  );
};
