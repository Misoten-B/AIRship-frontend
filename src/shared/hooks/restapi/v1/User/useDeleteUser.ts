import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useDeleteUser = () => {
  const { api } = useApiClient();
  const deleteUser = useCallback(async () => {
    try {
      return await api?.v1.users.$delete();
    } catch (error) {
      throw error;
    }
  }, [api?.v1.users]);
  return { deleteUser };
};
