'use client';
import { ArAssetItem } from '@/app/ar-assets/_components/ArAssetItem';
import { SimpleGrid } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { useGetArAssets } from '@/shared/hooks/restapi/v1/ArAssets';

export const SelectQRModal = () => {
  const { data, error, isLoading } = useGetArAssets();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader />;

  if (!data) return null;
  return (
    <SimpleGrid cols={{ base: 1, sm: 1 }}>
      {data.map((item) => (
        <ArAssetItem key={item.id} arAsset={item} />
      ))}
    </SimpleGrid>
  );
};
