import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useDeleteUser = (userId: string) => {
  const { api } = useApiClient();
  const deleteUser = useCallback(async () => {
    try {
      return await api?.v1.users._user_id(userId).$delete();
    } catch (error) {
      throw error;
    }
  }, [api?.v1.users, userId]);
  return { deleteUser };
};
