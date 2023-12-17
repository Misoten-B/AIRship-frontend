import Link from 'next/link';
import { Dto_ArAssetsResponse } from '@/api/@types';
import { Button } from '@/shared/components/common/Button';
import { Divider } from '@/shared/components/common/Divider';
import { Image } from '@/shared/components/common/Image';
import { Card, Flex } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { getQRCodeUrl } from '@/shared/components/features';
import { IconPencil, IconSpeakerphone } from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';

type Props = {
  arAsset: Dto_ArAssetsResponse;
};

export const ArAssetItem = ({ arAsset }: Props) => {
  const {
    id,
    qrcode_image_path,
    speaking_description,
    speaking_audio_path,
    three_dimentional_path,
  } = arAsset;

  if (!id) return null;
  return (
    <Card radius="md" withBorder mx={16} padding={0} pt={20} px={20} my={8}>
      <Card.Section mb={16}>
        <Flex gap={16} justify="space-around">
          <QRCode
            url={getQRCodeUrl(id)}
            imageSrc={qrcode_image_path}
            size={100}
          />
          <Image src={three_dimentional_path} alt="#" />
        </Flex>
      </Card.Section>
      <Card.Section>
        <Flex direction="column" align="flex-start">
          <audio
            controls
            src={speaking_audio_path}
            style={{ width: '100%', height: '30px' }}
          />
          <Title order={6} c="blue.6" mt={16} mb={4}>
            <IconSpeakerphone size="1em" />
            話させる文章
          </Title>
          <Text size="xs" lineClamp={2}>
            {speaking_description}
          </Text>
        </Flex>
      </Card.Section>
      <Card.Section>
        <Divider mt="md" />
        <Button
          component={Link}
          fullWidth
          href={ROUTES.arAssets.detail(id)}
          leftSection={<IconPencil />}
          size="md"
          variant="subtle"
        />
      </Card.Section>
    </Card>
  );
};
