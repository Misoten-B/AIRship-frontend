import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateUser = () => {
  const { api } = useApiClient();
  const createUser = useCallback(
    (token?: string) => {
      return api?.v1.users.$post({
        body: { isToured: true },
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    [api],
  );
  return { createUser };
};
