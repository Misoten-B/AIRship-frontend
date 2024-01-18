import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useDeleteQRCodeIcon = (arAssetID: string) => {
  const { api } = useApiClient();

  const deleteQRCodeIcon = useCallback(async () => {
    try {
      return api?.v1.users.ar_assets
        ._ar_assets_id(arAssetID)
        .qr_code_icon.$delete();
    } catch (error) {
      throw error;
    }
  }, [api?.v1.users.ar_assets, arAssetID]);

  return { deleteQRCodeIcon };
};
