'use client';
import {
  Display3dModel,
  QRCodeInsideImage,
  SpeakingArea,
} from './ArAssetDetailContent';
import { Container } from '@/shared/components/common/Container';
import { Divider } from '@/shared/components/common/Divider';
import { Center, Stack } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';

export const ArAssetDetail = () => {
  return (
    <Container p={0}>
      <Center bg="blue.1" h={350}>
        <QRCode
          url="https://airship.com"
          imageSrc="/airship-logo-column.svg"
          size={224}
        />
      </Center>
      <Stack p={32} gap={8}>
        <QRCodeInsideImage />
        <Divider my="sm" />
        <Display3dModel />
        <Divider my="sm" />
        <SpeakingArea />
      </Stack>
    </Container>
  );
};
