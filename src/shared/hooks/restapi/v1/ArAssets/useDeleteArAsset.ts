import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useDeleteArAsset = (arAssetId: string) => {
  const { api } = useApiClient();
  const deleteArAsset = useCallback(async () => {
    try {
      return api?.v1.users.ar_assets._ar_assets_id(arAssetId).$delete();
    } catch (error) {
      throw error;
    }
  }, [api?.v1.users.ar_assets, arAssetId]);
  return { deleteArAsset };
};
