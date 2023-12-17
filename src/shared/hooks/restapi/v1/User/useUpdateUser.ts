import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useUpdateUser = () => {
  const { api } = useApiClient();
  const updateUser = useCallback(
    async (isToured: boolean, recordedVoice: File | ReadStream | undefined) => {
      try {
        return await api?.v1.users.$put({
          body: { isToured: isToured, recorded_voice: recordedVoice },
        });
      } catch (error) {
        throw error;
      }
    },
    [api?.v1.users],
  );
  return { updateUser };
};
