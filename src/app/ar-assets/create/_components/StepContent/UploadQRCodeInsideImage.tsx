import { useState } from 'react';
import { Button, FileButton } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Group, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { SampleQrCodeImage } from '@/shared/components/features';
import { IconUpload } from '@/shared/components/icons';

export const UploadQRCodeInsideImage = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
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
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
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
  );
};
