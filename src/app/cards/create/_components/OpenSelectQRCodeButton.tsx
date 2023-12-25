'use client';
import { SelectQRModal } from './SelectQRModal';
import { Button } from '@/shared/components/common/Button';
import { Modal } from '@/shared/components/common/Modal';
import { useDisclosure } from '@/shared/lib/mantine';

export const ModalSelectQRCodeButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}></p>);
  return (
    <>
      <Modal opened={opened} onClose={close} title="QRコードを選択する">
        {content}
        <SelectQRModal />
        <Button onClick={close} w="100%" radius="md" mt="md">
          選択
        </Button>
      </Modal>

      <Button onClick={open} variant="outline" color="orange" radius="xl">
        QRコードを選択する
      </Button>
    </>
  );
};
