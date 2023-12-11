import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useUpdateThreeDimentionalModel = (
  threeDimentionalModelId: string,
) => {
  const { api } = useApiClient();
  const updateThreeDimentionalModel = useCallback(
    async (threeDimentionalModel: File | ReadStream) => {
      try {
        return await api?.v1.users.three_dimentionals
          ._three_dimentional_id(threeDimentionalModelId)
          .$put({ body: { ThreeDimentionalModel: threeDimentionalModel } });
      } catch (error) {
        throw error;
      }
    },
    [api?.v1.users.three_dimentionals, threeDimentionalModelId],
  );
  return { updateThreeDimentionalModel };
};
