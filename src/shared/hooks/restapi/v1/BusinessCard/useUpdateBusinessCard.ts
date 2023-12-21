import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useUpdateBusinessCard = (businessCardId: string) => {
  const { api } = useApiClient();
  const updaeBusinessCard = useCallback(
    (
      businessCardBackgroundImage: File | ReadStream,
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
      return api?.v1.users.business_cards
        ._business_card_id(businessCardId)
        .$put({
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
            BusinessCardBackgroundImage: businessCardBackgroundImage,
          },
        });
    },
    [api?.v1.users.business_cards, businessCardId],
  );
  return { updaeBusinessCard };
};
