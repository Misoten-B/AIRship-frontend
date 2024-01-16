import { TextInput } from '@mantine/core';
import { IconExternalLink, IconLink } from '@tabler/icons-react';
import Link from 'next/link';
import { useRequestBodiesValue } from '../../RequestBodiesProvider';
import { Button, CopyButton } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Group, Stack } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { QRCode } from '@/shared/components/common/QRCode';
import { Text } from '@/shared/components/common/Text';
import { getQRCodeUrl } from '@/shared/components/features';
import { IconArrowBarToDown } from '@/shared/components/icons';
import { useGetArAsset } from '@/shared/hooks/restapi/v1/ArAssets';
import { useComponentToPng } from '@/shared/hooks/useComponentToPng';

export const CompletedArAsset = () => {
  const requestBodies = useRequestBodiesValue();
  const { isLoading, data, error } = useGetArAsset(requestBodies['3']!);

  const { ref, download } = useComponentToPng<HTMLDivElement>('qr-code');

  if (isLoading) return <Loader />;

  if (error) return <div>failed to load</div>;
  if (!data) return null;

  const handleDownload = async () => {
    try {
      await download();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container mt={12} mb={64}>
      <Stack>
        {/* TODO: Notificationを置き換える */}
        {/* <Notification
          icon={checkIcon}
          color="green"
          withCloseButton={false}
          mb={24}
        >
          QRコードの作成が完了しました！
        </Notification> */}
        <Center>
          <Stack>
            <QRCode
              url={getQRCodeUrl(data.id)}
              imagesrc={data.qrcodeImagePath}
              size={100}
              qrref={ref}
            />
            <Button
              variant="transparent"
              component={Link}
              target="_blank"
              href={getQRCodeUrl(data.id)}
              leftSection={<IconExternalLink />}
            >
              実際に確認する
            </Button>
            <Text size="sm" c="gray" w={240}>
              カメラで読み取るとARで3D画像と生成された声を聞くことができます。
            </Text>
          </Stack>
        </Center>
        <Center>
          <Stack>
            <Stack>
              <Text size="xs" c="gray.6">
                URLをコピー
              </Text>
              <Group
                gap={0}
                justify="space-around"
                style={{ alignItems: 'center' }}
              >
                <TextInput
                  leftSection={<IconLink />}
                  defaultValue={getQRCodeUrl(data.id)}
                  readOnly
                />
                <CopyButton value={getQRCodeUrl(data.id)} />
              </Group>
            </Stack>
            <Button
              leftSection={<IconArrowBarToDown />}
              radius="xl"
              w={240}
              mt={24}
              onClick={handleDownload}
            >
              QRコードをダウンロード
            </Button>
          </Stack>
        </Center>
      </Stack>
    </Container>
  );
};
