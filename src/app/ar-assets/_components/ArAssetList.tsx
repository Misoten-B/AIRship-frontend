'use client';

import { SimpleGrid } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { ArAssetItem } from '@/shared/components/features/QRCode/ArAssetItem';
import { useGetArAssets } from '@/shared/hooks/restapi/v1/ArAssets';

export const ArAssetList = () => {
  const { data, error, isLoading } = useGetArAssets();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader />;

  if (!data) return null;
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {data.map((item) => (
        <ArAssetItem key={item.id} arAsset={item} hideElement />
      ))}
    </SimpleGrid>
  );
};
