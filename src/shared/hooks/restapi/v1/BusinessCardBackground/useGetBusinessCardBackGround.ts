import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetBusinessCardBackground = () => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.users.business_card_backgrounds.$path(),
    () => api?.v1.users.business_card_backgrounds.$get(),
  );
};
