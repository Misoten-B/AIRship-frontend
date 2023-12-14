import Link from 'next/link';
import { ARAsset } from '../_types';
import { Button } from '@/shared/components/common/Button';
import { Divider } from '@/shared/components/common/Divider';
import { Image } from '@/shared/components/common/Image';
import { Card, Flex } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconPencil, IconSpeakerphone } from '@/shared/components/icons';
import { ROUTES } from '@/shared/constants';

type Props = {
  arAsset: ARAsset;
};

export const ArAssetCard = ({ arAsset }: Props) => {
  return (
    <Card radius="md" withBorder mx={16} padding={0} pt={20} px={20} my={8}>
      <Card.Section mb={16}>
        <Flex gap={16} justify="space-around">
          <QRCode
            url={arAsset.id}
            imageSrc={arAsset.qrcode_image_path}
            size={100}
          />
          <Image src={arAsset.three_dimentional_path} alt="#" />
        </Flex>
      </Card.Section>
      <Card.Section>
        <Flex direction="column" align="flex-start">
          <audio controls src="" style={{ width: '100%', height: '30px' }} />
          <Title order={6} c="blue.6" mt={16} mb={4}>
            <IconSpeakerphone size="1em" />
            話させる文章
          </Title>
          <Text size="xs" lineClamp={2}>
            {arAsset.speaking_description}
          </Text>
        </Flex>
      </Card.Section>
      <Card.Section>
        <Divider mt="md" />
        <Button
          component={Link}
          fullWidth
          href={ROUTES.arAssets.detail(arAsset.id)}
          leftSection={<IconPencil />}
          size="md"
          variant="subtle"
        />
      </Card.Section>
    </Card>
  );
};
