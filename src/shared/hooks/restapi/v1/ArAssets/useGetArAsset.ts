import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetArAsset = (arAssetId: string) => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.users.ar_assets._ar_assets_id(arAssetId).$path(),
    () => api?.v1.users.ar_assets._ar_assets_id(arAssetId).$get(),
  );
};
