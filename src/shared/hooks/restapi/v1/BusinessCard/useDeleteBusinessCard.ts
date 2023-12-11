import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useDeleteBusinessCard = (businessCardId: string) => {
  const { api } = useApiClient();
  const deleteBusinessCard = useCallback(() => {
    return api?.v1.users.business_cards
      ._business_card_id(businessCardId)
      .$delete();
  }, [api?.v1.users.business_cards, businessCardId]);

  return { deleteBusinessCard };
};
