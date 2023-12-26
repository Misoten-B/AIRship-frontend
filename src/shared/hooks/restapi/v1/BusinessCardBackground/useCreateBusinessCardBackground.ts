import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateBusinessCardBackground = () => {
  const { api } = useApiClient();
  const createBusinessCardBackground = useCallback(
    (color: string, image?: File | ReadStream) => {
      try {
        return api?.v1.users.business_card_backgrounds.$post({
          body: {
            BusinessCardBackgroundImage: image,
            businessCardBackgroundColor: color,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    [api?.v1.users.business_card_backgrounds],
  );
  return { createBusinessCardBackground };
};
