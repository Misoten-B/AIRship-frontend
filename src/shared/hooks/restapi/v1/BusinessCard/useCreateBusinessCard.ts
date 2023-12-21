import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateBusinessCard = () => {
  const { api } = useApiClient();
  const createBusinessCard = useCallback(
    (
      arAssetsId: string,
      businessCardBackgroundId: string,
      businessCardPartsCoordinate: string,
      displayName: string,
      address?: string | undefined,
      businessCardName?: string | undefined,
      companyName?: string | undefined,
      department?: string | undefined,
      email?: string | undefined,
      officialPosition?: string | undefined,
      phoneNumber?: string | undefined,
      postalCode?: string | undefined,
    ) => {
      return api?.v1.users.business_cards.$post({
        body: {
          address,
          arAssetsId: arAssetsId,
          businessCardBackgroundId: businessCardBackgroundId,
          businessCardName: businessCardName,
          businessCardPartsCoordinateId: businessCardPartsCoordinate,
          companyName: companyName,
          department,
          displayName: displayName,
          email,
          officialPosition: officialPosition,
          phoneNumber: phoneNumber,
          postalCode: postalCode,
        },
      });
    },
    [api?.v1.users.business_cards],
  );
  return { createBusinessCard };
};
