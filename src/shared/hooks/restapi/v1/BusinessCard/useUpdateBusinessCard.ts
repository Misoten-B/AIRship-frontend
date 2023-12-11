import { ReadStream } from 'fs';
import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useUpdateBusinessCard = (businessCardId: string) => {
  const { api } = useApiClient();
  const updaeBusinessCard = useCallback(
    (
      businessCardBackgroundImage: File | ReadStream,
      address?: string | undefined,
      arAssetsId?: string | undefined,
      businessCardBackgroundId?: string | undefined,
      businessCardName?: string | undefined,
      businessCardPartsCoordinate?: string | undefined,
      companyName?: string | undefined,
      department?: string | undefined,
      displayName?: string | undefined,
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
            ar_assets_id: arAssetsId,
            business_card_background_id: businessCardBackgroundId,
            business_card_name: businessCardName,
            business_card_parts_coordinate: businessCardPartsCoordinate,
            company_name: companyName,
            department,
            display_name: displayName,
            email,
            official_position: officialPosition,
            phone_number: phoneNumber,
            postal_code: postalCode,
            BusinessCardBackgroundImage: businessCardBackgroundImage,
          },
        });
    },
    [api?.v1.users.business_cards, businessCardId],
  );
  return { updaeBusinessCard };
};
