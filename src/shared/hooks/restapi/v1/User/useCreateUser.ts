import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateUser = () => {
  const { api } = useApiClient();
  const createUser = useCallback(
    async (isToured: boolean) => {
      try {
        return await api?.v1.users.$post({ body: { is_toured: isToured } });
      } catch (error) {
        throw error;
      }
    },
    [api?.v1.users],
  );
  return { createUser };
};
