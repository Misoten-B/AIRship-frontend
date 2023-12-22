import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetBusinessCardCoordinate = () => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.business_card_parts_coordinates.$path(),
    () => api?.v1.business_card_parts_coordinates.$get(),
  );
};
