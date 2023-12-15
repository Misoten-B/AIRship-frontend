import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetThreeDimentionalModels = () => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.users.three_dimentionals.$path(),
    () => api?.v1.users.three_dimentionals.$get(),
  );
};
