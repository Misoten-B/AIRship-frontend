import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetBusinessCards = () => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.users.business_cards.$path(),
    () => api?.v1.users.business_cards.$get(),
  );
};
