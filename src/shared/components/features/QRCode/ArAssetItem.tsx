import Link from 'next/link';
import { ModelViewer } from '../../common/ModelViewer';
import { Dto_ArAssetsResponse } from '@/api/@types';
import { Button } from '@/shared/components/common/Button';
import { Divider } from '@/shared/components/common/Divider';
import { Card, Flex, Stack } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';
import { Radio } from '@/shared/components/common/Radio';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { getQRCodeUrl } from '@/shared/components/features';
import { IconPencil, IconSpeakerphone } from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';

type Props = {
  arAsset: Dto_ArAssetsResponse;
  hideElement?: boolean;
  setValue?: (value: string) => void;
};

export const ArAssetItem = ({
  arAsset,
  hideElement = false,
  setValue,
}: Props) => {
  const {
    id,
    qrcodeImagePath,
    threeDimentionalPath,
    speakingAudioPath,
    speakingDescription,
  } = arAsset;

  if (!id) return null;

  return (
    <Card
      radius="md"
      withBorder
      mx={16}
      padding={0}
      pt={20}
      px={20}
      my={8}
      onClick={setValue ? () => setValue(id) : undefined}
    >
      {!hideElement && <Radio.Item value={id} />}
      <Card.Section mb={16}>
        <Flex gap={16} justify="space-around">
          <QRCode
            url={getQRCodeUrl(id)}
            imagesrc={qrcodeImagePath}
            size={100}
          />
          <ModelViewer
            glb={threeDimentionalPath}
            alt={`${threeDimentionalPath} 3d model`}
            poster={''}
            // usdz={'/cat.usdz'}
            style={{ width: '100%' }}
          >
            <Button slot="ar-button" display="none" />
          </ModelViewer>
        </Flex>
      </Card.Section>
      <Card.Section>
        <Flex direction="column" align="flex-start">
          <audio
            controls
            src={speakingAudioPath}
            style={{ width: '100%', height: '30px' }}
          />
          <Title order={6} c="blue.6" mt={16} mb={4}>
            <IconSpeakerphone size="1em" />
            話させる文章
          </Title>
          <Text size="xs" lineClamp={2} mb="md">
            {speakingDescription}
          </Text>
        </Flex>
      </Card.Section>
      <Card.Section>
        {hideElement && (
          <Stack gap="0">
            <Divider />
            <Button
              component={Link}
              fullWidth
              href={ROUTES.arAssets.detail(id)}
              leftSection={<IconPencil />}
              size="md"
              variant="subtle"
            />
          </Stack>
        )}
      </Card.Section>
    </Card>
  );
};
