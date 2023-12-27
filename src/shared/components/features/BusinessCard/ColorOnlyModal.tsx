import { useForm } from 'react-hook-form';
import { ColorPicker } from 'react-hook-form-mantine';
import { Button } from '../../common/Button';
import { Stack } from '../../common/Layout';
import { Modal } from '../../common/Modal';
import { BusinessCardAspectRatio } from './BusinessCardAspectRatio';
import {
  useCreateBusinessCardBackground,
  useGetBusinessCardBackground,
} from '@/shared/hooks/restapi/v1/BusinessCardBackground';
import { useDisclosure } from '@/shared/lib/mantine';

export const ColorOnlyModal = () => {
  const { createBusinessCardBackground } = useCreateBusinessCardBackground();
  const [isOpen, { open, close }] = useDisclosure();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      backgroundColor: '#ffffff',
    },
  });
  const { mutate } = useGetBusinessCardBackground();

  const onSubmit = async (data: { backgroundColor: string }) => {
    const res = await createBusinessCardBackground(data.backgroundColor);
    if (res) {
      await mutate();
      close();
    }
  };

  return (
    <>
      <BusinessCardAspectRatio>
        <Button
          w="100%"
          h="100%"
          variant="outline"
          color="gray"
          size="xs"
          onClick={open}
        >
          単色
        </Button>
      </BusinessCardAspectRatio>
      <Modal opened={isOpen} onClose={close} title="名刺の背景色" size="xl">
        <Stack align="center" gap="md">
          <ColorPicker
            control={control}
            name="backgroundColor"
            format="hex"
            swatches={[
              '#2e2e2e',
              '#ffffff',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
          />
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            アップロードする
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
