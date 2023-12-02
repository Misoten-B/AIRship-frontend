import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Notification } from '@/shared/components/common/Feedback';
import { Center, Stack } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';
import { rem } from '@/shared/components/common/STYLES';
import { Text } from '@/shared/components/common/Text';
import { IconArrowBarToDown, IconCheck } from '@/shared/components/icons';

export const CompletedArAsset = () => {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  return (
    <Container mt={12} mb={64}>
      <Stack>
        <Notification
          icon={checkIcon}
          color="green"
          withCloseButton={false}
          mb={24}
        >
          QRコードの作成が完了しました！
        </Notification>
        <Center>
          <Stack>
            <QRCode
              url="https://airship.com"
              imageSrc="/airship-logo-column.svg"
              size={200}
            />
            <Text size="sm" c="gray" w={240}>
              カメラで読み取るとARで3D画像と生成された声を聞くことができます。
            </Text>
          </Stack>
        </Center>
        <Center>
          <Button
            leftSection={<IconArrowBarToDown />}
            radius="xl"
            w={240}
            mt={24}
          >
            QRコードをダウンロード
          </Button>
        </Center>
      </Stack>
    </Container>
  );
};
