import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useUpdateArAsset = (arAssetId: string) => {
  const { api } = useApiClient();
  const updateArAsset = useCallback(
    async (
      qrCodeIcon?: File | ReadStream,
      speakingDescription?: string,
      threeDimentionalId?: string,
    ) => {
      try {
        return api?.v1.users.ar_assets._ar_assets_id(arAssetId).$put({
          body: {
            qrcodeIcon: qrCodeIcon,
            speaking_description: speakingDescription,
            three_dimentional_ID: threeDimentionalId,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    [api?.v1.users.ar_assets, arAssetId],
  );
  return { updateArAsset };
};
