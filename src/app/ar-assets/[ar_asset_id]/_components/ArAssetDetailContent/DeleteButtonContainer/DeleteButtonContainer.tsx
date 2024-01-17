import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/common/Button';
import { Group } from '@/shared/components/common/Layout';
import { ROUTES } from '@/shared/constants';
import { useDeleteArAsset } from '@/shared/hooks/restapi/v1/ArAssets';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { isApiError } from '@/shared/lib/axios/errorHandling';
import { useLoading } from '@/shared/providers/loading';

export const DeleteButtonContainer = ({ id }: { id: string }) => {
  const { infoNotification, errorNotification } = useNotifications();
  const { deleteArAsset } = useDeleteArAsset(id);
  const { open, close } = useLoading();
  const router = useRouter();

  const handleClick = async () => {
    try {
      open();

      await deleteArAsset();

      infoNotification('QRコードを削除しました');
      router.replace(ROUTES.arAssets.base);
    } catch (error) {
      const message = 'QRコードの削除に失敗しました';

      if (isApiError(error)) {
        errorNotification(error.response?.data.error ?? message);
      } else {
        errorNotification(message);
      }
    } finally {
      close();
    }
  };

  return (
    <Group justify="flex-end">
      <Button color="red" variant="filled" onClick={handleClick}>
        QRコードを削除する
      </Button>
    </Group>
  );
};
