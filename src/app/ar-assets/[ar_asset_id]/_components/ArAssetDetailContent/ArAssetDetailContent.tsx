import { DeleteButtonContainer } from './DeleteButtonContainer/DeleteButtonContainer';
import { Display3dModel } from './Display3dModel/Display3dModel';
import { QRCodeInsideImage } from './QRCodeInsideImage/QRCodeInsideImage';
import { SpeakingArea } from './SpeakingArea/SpeakingArea';
import { Divider } from '@/shared/components/common/Divider';
import { Stack } from '@/shared/components/common/Layout';

export const ArAssetDetailContent = ({ id }: { id: string }) => {
  return (
    <Stack p={32} gap={8}>
      <QRCodeInsideImage id={id} />
      <Divider my="sm" />
      <Display3dModel id={id} />
      <Divider my="sm" />
      <SpeakingArea id={id} />
      <Divider my="xl" />
      <DeleteButtonContainer id={id} />
    </Stack>
  );
};
