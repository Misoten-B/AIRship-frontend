import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useUpdateArAsset = (arAssetId: string) => {
  const { api } = useApiClient();
  const updateArAsset = useCallback(
    async (
      speakingDescription: string,
      threeDimentionalId: string,
      qrCodeIcon?: File | ReadStream,
    ) => {
      try {
        return api?.v1.users.ar_assets._ar_assets_id(arAssetId).$put({
          body: {
            qrcodeIcon: qrCodeIcon,
            speakingDescription: speakingDescription,
            threeDimentionalID: threeDimentionalId,
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
