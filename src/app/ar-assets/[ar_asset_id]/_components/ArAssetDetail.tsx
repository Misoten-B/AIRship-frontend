import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    if (!ref.current) return;

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <Container p={0}>
      <Center bg="blue.1" h={350}>
        <button onClick={handleDownload}>DOWNLOAD</button>
        <div ref={ref}>
          <QRCode
            url="https://airship.com"
            imagesrc="/airship-logo-column.svg"
            size={224}
          />
        </div>
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
