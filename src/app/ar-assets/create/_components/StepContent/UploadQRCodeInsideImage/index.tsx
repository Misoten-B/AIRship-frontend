import { useCallback, useState } from 'react';
import {
  useRequestBodiesValue,
  useSetRequestBodies,
} from '../../RequestBodiesProvider';
import { Box } from '@/shared/components/common/Box';
import { Button, FileButton } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Group, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { SampleQrCodeImage } from '@/shared/components/features';
import {
  IconChevronLeft,
  IconChevronRight,
  IconUpload,
} from '@/shared/components/icons';
import { useCreateArAsset } from '@/shared/hooks/restapi/v1/ArAssets';

type Props = {
  prevStep: () => void;
};

export const UploadQRCodeInsideImage = ({ prevStep }: Props) => {
  const requestBodies = useRequestBodiesValue();
  const setRequestBodies = useSetRequestBodies();

  const { createArAsset } = useCreateArAsset();

  const [file, setFile] = useState(requestBodies['2']?.image);

  const setQrCodeInsideImage = useCallback(
    (file?: File) => {
      setRequestBodies((prev) => ({
        ...prev,
        '2': {
          image: file,
        },
      }));
    },
    [setRequestBodies],
  );

  const handleClick = useCallback(async () => {
    try {
      const select3DModel = requestBodies['0']!;
      const speakingSetting = requestBodies['1']!;
      const qrCodeInsideImage = requestBodies['2'];

      await createArAsset(
        qrCodeInsideImage?.image,
        speakingSetting.text,
        select3DModel.id,
      );
    } catch (error) {
      console.error(error);
    }
  }, [requestBodies, createArAsset]);

  const handleUpload = (file: File | null) => {
    if (!file) return;

    setFile(file);
    setQrCodeInsideImage(file);
  };

  return (
    <Box pos="relative">
      <Container>
        <Title order={5} mb={4}>
          QRコード内画像
        </Title>
        <Text size="xs" c="gray.6" mb={28}>
          QRコード真ん中に表示される画像です
        </Text>
        <Center>
          <Stack>
            <SampleQrCodeImage />
            {file && (
              <Text size="sm" ta="center" mt="sm" c="gray.6">
                {file.name}
              </Text>
            )}
            <Group justify="center">
              <FileButton onChange={handleUpload} accept="image/png,image/jpeg">
                {(props) => (
                  <Button {...props} w={200} leftSection={<IconUpload />}>
                    画像アップロード
                  </Button>
                )}
              </FileButton>
            </Group>
          </Stack>
        </Center>
      </Container>
      <Group my="xl" p={0} justify={'space-between'}>
        <Button
          variant="outline"
          size="xs"
          leftSection={<IconChevronLeft size={14} />}
          onClick={prevStep}
        >
          前のステップ
        </Button>
        <Button
          size="xs"
          rightSection={<IconChevronRight size={14} />}
          onClick={handleClick}
        >
          完了
        </Button>
      </Group>
    </Box>
  );
};
