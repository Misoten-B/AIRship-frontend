import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetPublicBusinessCard = (businessCardId: string) => {
  const { api } = useApiClient();

  return useSWR(
    api?.v1.business_cards._business_card_id(businessCardId).$path(),
    () => api?.v1.business_cards._business_card_id(businessCardId).$get(),
  );
};
