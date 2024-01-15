'use client';

import { useEffect } from 'react';
import {
  Display3dModel,
  QRCodeInsideImage,
  SpeakingArea,
} from './ArAssetDetailContent';
import { Divider } from '@/shared/components/common/Divider';
import { Card, Center, Stack } from '@/shared/components/common/Layout';
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
      <Stack p={32} gap={8}>
        <QRCodeInsideImage id={id} />
        <Divider my="sm" />
        <Display3dModel id={id} />
        <Divider my="sm" />
        <SpeakingArea id={id} />
      </Stack>
    </>
  );
};
