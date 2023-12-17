'use client';
import { useState } from 'react';
import { Button, FileButton } from '@/shared/components/common/Button';
import { Group, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconUpload } from '@/shared/components/icons';

export const QRCodeInsideImage = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Stack gap="xs">
      <Title order={5} c="blue.6" mb={4}>
        QRコード内画像
      </Title>

      <Text size="sm" ta="center" c="gray.6">
        airship_logo.png
      </Text>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Button
              variant="outline"
              radius="xl"
              {...props}
              w={200}
              leftSection={<IconUpload />}
            >
              画像アップロード
            </Button>
          )}
        </FileButton>
      </Group>
    </Stack>
  );
};
