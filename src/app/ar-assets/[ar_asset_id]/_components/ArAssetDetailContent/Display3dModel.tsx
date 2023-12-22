'use client';
import { z } from 'zod';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Image } from '@/shared/components/common/Image';
import { FileInput } from '@/shared/components/common/Input';
import { Grid, Group, Stack } from '@/shared/components/common/Layout';
import { Modal } from '@/shared/components/common/Modal';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { SelectThreeDModel } from '@/shared/components/features/SelectThreeDModel';
import { useForm } from '@/shared/hooks/useForm';
import { useDisclosure } from '@/shared/lib/mantine';

const schema = z.object({
  threeDModel: z.string(),
});

const fileInputSchema = z.object({
  fileInput: z.string(),
});

type FormSchemaType = z.infer<typeof schema>;
type FileInputSchemaType = z.infer<typeof fileInputSchema>;

export const Display3dModel = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { control, setValue } = useForm<FormSchemaType>({
    defaultValues: {
      threeDModel: '',
    },
  });
  const { control: fileInputControl } = useForm<FileInputSchemaType>({
    defaultValues: {
      fileInput: '',
    },
  });

  const handleSetValue = (value: string) => {
    setValue('threeDModel', value);
  };

  return (
    <Stack gap={0}>
      <Title order={5} c="blue.6" mb={4}>
        3Dモデルデータ
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        3Dモデルデータを登録すると、QRコードから3DモデルをARとして表示させることができます。
      </Text>
      <Group justify="center" mt={8}>
        <Image src="/3d_model_image.svg" alt="3d_model_image" height={160} />

        <Modal opened={opened} onClose={close}>
          <Container>
            <Title order={5} mb={4} c="dark">
              サンプル3Dモデル
            </Title>
            <Text size="xs" c="gray.6" mb={12}>
              サンプルから選択してください
            </Text>

            <SelectThreeDModel control={control} setValue={handleSetValue} />

            <Grid>
              <Grid.Col span={4}>
                <FileInput
                  // TODO: wip
                  name="fileInput"
                  control={fileInputControl}
                  placeholder="アップロード"
                  size="xs"
                  styles={{
                    wrapper: { height: '100%' },
                    root: { height: '100%' },
                    input: { height: 'calc(100% - 28px)' },
                  }}
                />
              </Grid.Col>
            </Grid>

            <Button onClick={close} w="100%" radius="md">
              選択
            </Button>
          </Container>
        </Modal>

        <Button variant="outline" color="orange" radius="xl" onClick={open}>
          選択する
        </Button>
      </Group>
    </Stack>
  );
};
