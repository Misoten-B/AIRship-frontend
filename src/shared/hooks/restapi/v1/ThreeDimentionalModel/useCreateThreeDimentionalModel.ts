import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateThreeDimentionalModel = () => {
  const { api } = useApiClient();
  const createThreeDimentionalModel = useCallback(
    async (threeDimentionalModel: File | ReadStream) => {
      try {
        return await api?.v1.users.three_dimentionals.$post({
          body: { ThreeDimentionalModel: threeDimentionalModel },
        });
      } catch (error) {
        throw error;
      }
    },
    [api?.v1.users.three_dimentionals],
  );
  return { createThreeDimentionalModel };
};
