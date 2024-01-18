'use client';
import { Control } from 'react-hook-form';
import { SelectQRModal } from './SelectQRModal';
import { Button } from '@/shared/components/common/Button';
import { Modal } from '@/shared/components/common/Modal';
import { useDisclosure } from '@/shared/lib/mantine';

type Props = {
  setValue: (value: string) => void;
  control: Control<
    {
      qrCodeSelection: string;
    },
    any
  >;
};

export const SelectQRCodeModal = ({ setValue, control }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="QRコードを選択する">
        <SelectQRModal setValue={setValue} control={control} />
        <Button onClick={close} w="100%" radius="md" mt="md">
          閉じる
        </Button>
      </Modal>

      <Button onClick={open} variant="outline" color="orange" radius="xl">
        QRコードを選択する
      </Button>
    </>
  );
};
