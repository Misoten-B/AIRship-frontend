import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetThreeDimentionalModel = (
  threeDimentionalModelId: string,
) => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.users.three_dimentionals._three_dimentional_id(
      threeDimentionalModelId,
    ),
  );
};
