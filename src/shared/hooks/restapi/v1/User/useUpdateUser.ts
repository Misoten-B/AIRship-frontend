import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useUpdateUser = (userId: string) => {
  const { api } = useApiClient();
  const updateUser = useCallback(
    async (isToured: boolean, recordedVoice: File | ReadStream | undefined) => {
      try {
        return await api?.v1.users._user_id(userId).$put({
          body: { isToured: isToured, recorded_voice: recordedVoice },
        });
      } catch (error) {
        throw error;
      }
    },
    [api?.v1.users, userId],
  );
  return { updateUser };
};
