'use client';

import { useEffect } from 'react';
import { ArAssetDetailContent } from './ArAssetDetailContent';
import { Card, Center } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';
import { getQRCodeUrl } from '@/shared/components/features';
import { useGetArAsset } from '@/shared/hooks/restapi/v1/ArAssets';
import { useLoading } from '@/shared/providers/loading';

export const ArAssetDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetArAsset(id);
  const { open, close } = useLoading();

  useEffect(() => {
    if (isLoading) open();
    if (!isLoading) close();

    return () => close();
  }, [close, isLoading, open]);

  if (!data) return null;
  if (error) return <div>failed to load</div>;

  return (
    <>
      <Card>
        <Center>
          <QRCode
            url={getQRCodeUrl(data.id)}
            imagesrc={data.qrcodeImagePath ?? ''}
            size={224}
          />
        </Center>
      </Card>
      <ArAssetDetailContent id={id} />
    </>
  );
};
