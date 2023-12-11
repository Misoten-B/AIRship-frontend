import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useDeleteThreeDimentionalModel = (
  threeDimentionalModelId: string,
) => {
  const { api } = useApiClient();
  const deleteThreeDimentionalModel = useCallback(async () => {
    try {
      return await api?.v1.users.three_dimentionals
        ._three_dimentional_id(threeDimentionalModelId)
        .$delete();
    } catch (error) {
      throw error;
    }
  }, [api?.v1.users.three_dimentionals, threeDimentionalModelId]);
  return { deleteThreeDimentionalModel };
};
