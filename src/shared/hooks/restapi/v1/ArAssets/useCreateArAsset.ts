import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateArAsset = () => {
  const { api } = useApiClient();
  const createArAsset = useCallback(
    async (
      qrCodeIcon?: File | ReadStream,
      speakingDescription?: string,
      threeDimentionalId?: string,
    ) => {
      try {
        return api?.v1.users.ar_assets.$post({
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
    [api?.v1.users.ar_assets],
  );
  return { createArAsset };
};
