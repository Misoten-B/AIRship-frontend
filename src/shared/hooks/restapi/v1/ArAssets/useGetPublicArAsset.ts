import useSWR from 'swr';
import { useApiClient } from '@/shared/lib/axios/AxiosProvider';

export const useGetPublicArAsset = (arAssetId: string) => {
  const { api } = useApiClient();
  return useSWR(
    api?.v1.ar_assets._ar_assets_id(arAssetId).$path(),
    () => api?.v1.ar_assets._ar_assets_id(arAssetId).$get(),
  );
};
