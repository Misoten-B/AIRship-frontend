import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetArAssets = () => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.users.ar_assets.$path(),
    () => api?.v1.users.ar_assets.$get(),
  );
};
