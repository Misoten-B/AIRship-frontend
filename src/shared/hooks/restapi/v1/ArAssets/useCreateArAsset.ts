import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateArAsset = () => {
  const { api } = useApiClient();
  const createArAsset = useCallback(
    async (
      speakingDescription: string,
      threeDimentionalId: string,
      qrCodeIcon?: File | ReadStream,
    ) => {
      try {
        return api?.v1.users.ar_assets.post({
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
    [api?.v1.users.ar_assets],
  );
  return { createArAsset };
};
