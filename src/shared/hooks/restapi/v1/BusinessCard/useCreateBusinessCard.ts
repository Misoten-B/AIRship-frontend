import { useCallback } from 'react';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useCreateBusinessCard = () => {
  const { api } = useApiClient();
  const createBusinessCard = useCallback(
    (
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
      return api?.v1.users.business_cards.$post({
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
        },
      });
    },
    [api?.v1.users.business_cards],
  );
  return { createBusinessCard };
};
