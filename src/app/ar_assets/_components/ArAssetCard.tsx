import { Image } from '@/shared/components/common/Image';
import { Card, Flex } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

export const ArAssetCard = () => {
  return (
    <Card radius="md" withBorder mx={16} padding={0} p={20} my={8}>
      <Card.Section mb={16}>
        <Flex gap={16} justify="center">
          <QRCode
            url="https://airship.com"
            imageSrc="/airship-logo-column.svg"
            size={100}
          />
          <Image src="/3d_model_image.svg" alt="#" />
        </Flex>
      </Card.Section>
      <Flex direction="column" align="flex-start">
        <audio controls src="" style={{ width: '100%', height: '30px' }} />
        <Title order={6} c="blue.6" mt={16} mb={4}>
          話させる文章
        </Title>
        <Text size="xs" lineClamp={2}>
          私の名前は山田太郎です。好きなことはゲームをすることとカラオケで歌を歌うことです。長所は笑顔で接するこ
        </Text>
      </Flex>
    </Card>
  );
};
