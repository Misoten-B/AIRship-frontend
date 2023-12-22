import { useRequestBodiesValue } from '../../RequestBodiesProvider';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Stack } from '@/shared/components/common/Layout';
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
              qrRef={ref}
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
            onClick={handleDownload}
          >
            QRコードをダウンロード
          </Button>
        </Center>
      </Stack>
    </Container>
  );
};
