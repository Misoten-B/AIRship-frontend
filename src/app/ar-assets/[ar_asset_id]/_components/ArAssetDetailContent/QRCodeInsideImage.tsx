'use client';
import { useEffect, useState } from 'react';
import { Button, FileButton } from '@/shared/components/common/Button';
import { Group, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { IconUpload } from '@/shared/components/icons';
import {
  useDeleteQRCodeIcon,
  useGetArAsset,
} from '@/shared/hooks/restapi/v1/ArAssets';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { isApiError } from '@/shared/lib/axios/errorHandling';
import { useLoading } from '@/shared/providers/loading';

type Props = {
  id: string;
};

export const QRCodeInsideImage = ({ id }: Props) => {
  const { data, isLoading, error, mutate } = useGetArAsset(id);
  const { infoNotification, errorNotification } = useNotifications();
  const { deleteQRCodeIcon } = useDeleteQRCodeIcon(id);
  const [file, setFile] = useState<File | null>(null);
  const { open, close } = useLoading();

  useEffect(() => {
    if (isLoading) open();
    if (!isLoading) close();

    return () => {
      close();
    };
  }, [close, isLoading, open]);

  const handleDelete = async () => {
    try {
      open();
      if (!data) return;

      await deleteQRCodeIcon();

      infoNotification('QRコードアイコンを削除しました');
      mutate();
    } catch (error) {
      const message = 'QRコードアイコンの削除に失敗しました';

      if (isApiError(error)) {
        errorNotification(error.response?.data.error ?? message);
      } else {
        errorNotification(message);
      }
    } finally {
      close();
    }
  };

  if (error) return <div>failed to load</div>;
  if (!data) return null;

  return (
    <Stack gap="xs">
      <Title order={5} c="blue.6" mb={4}>
        QRコード内画像
      </Title>

      <Text size="sm" ta="center" c="gray.6">
        {file?.name ?? '画像をアップロードしてください'}
      </Text>
      <Group justify="center" wrap="nowrap">
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
        <Button variant="filled" radius="xl" w={200} onClick={handleDelete}>
          画像消去
        </Button>
      </Group>
    </Stack>
  );
};
