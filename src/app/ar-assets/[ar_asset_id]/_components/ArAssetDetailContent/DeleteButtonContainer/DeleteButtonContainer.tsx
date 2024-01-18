import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/common/Button';
import { Group } from '@/shared/components/common/Layout';
import { Modal } from '@/shared/components/common/Modal';
import { Text } from '@/shared/components/common/Text';
import { ROUTES } from '@/shared/constants';
import { useDeleteArAsset } from '@/shared/hooks/restapi/v1/ArAssets';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { isApiError } from '@/shared/lib/axios/errorHandling';
import { useDisclosure } from '@/shared/lib/mantine';
import { useLoading } from '@/shared/providers/loading';

export const DeleteButtonContainer = ({ id }: { id: string }) => {
  const { infoNotification, errorNotification } = useNotifications();
  const { deleteArAsset } = useDeleteArAsset(id);
  const { open, close } = useLoading();
  const router = useRouter();
  const [opened, { open: openModal, close: closeModal }] = useDisclosure();

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
    <>
      <Group justify="flex-end">
        <Button color="red" variant="filled" onClick={openModal}>
          QRコードを削除する
        </Button>
      </Group>
      <Modal
        opened={opened}
        onClose={closeModal}
        title="QRコードの削除"
        centered
      >
        <Text size="sm" m="md">
          削除すると紐づけられた名刺も削除されます。 <br />
          本当に削除しますか？
        </Text>
        <Group justify="right">
          <Button variant="white" onClick={closeModal}>
            キャンセル
          </Button>
          <Button color="red" variant="filled" onClick={handleClick} size="sm">
            削除する
          </Button>
        </Group>
      </Modal>
    </>
  );
};
