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
      address?: string,
      businessCardName?: string,
      companyName?: string,
      department?: string,
      email?: string,
      officialPosition?: string,
      phoneNumber?: string,
      postalCode?: string,
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
