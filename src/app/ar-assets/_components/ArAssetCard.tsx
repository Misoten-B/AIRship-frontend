import { Button } from '@/shared/components/common/Button';
import { Divider } from '@/shared/components/common/Divider';
import { Image } from '@/shared/components/common/Image';
import { Card, Flex } from '@/shared/components/common/Layout';
import { Anchor } from '@/shared/components/common/Navigation';
import { QRCode } from '@/shared/components/common/QRCode';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconPencil, IconSpeakerphone } from '@/shared/components/icons';

type Props = {
  text: string;
  url: string;
};

export const ArAssetCard = ({ text, url }: Props) => {
  return (
    <Card radius="md" withBorder mx={16} padding={0} pt={20} px={20} my={8}>
      <Card.Section mb={16}>
        <Flex gap={16} justify="space-around">
          <QRCode url={url} imageSrc="/airship-logo-column.svg" size={100} />
          <Image src="/3d_model_image.svg" alt="#" />
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
            {text}
          </Text>
        </Flex>
      </Card.Section>
      <Card.Section>
        <Divider mt="md" />
        <Anchor href="ar-assets/[ar_asset_id]">
          <Button
            variant="subtle"
            size="md"
            fullWidth
            leftSection={<IconPencil />}
          />
        </Anchor>
      </Card.Section>
    </Card>
  );
};
