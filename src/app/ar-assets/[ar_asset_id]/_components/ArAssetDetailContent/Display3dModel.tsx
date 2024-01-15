'use client';
import { useEffect } from 'react';
import { z } from 'zod';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { FileInput } from '@/shared/components/common/Input';
import { Grid, Group, Stack } from '@/shared/components/common/Layout';
import { Modal } from '@/shared/components/common/Modal';
import { ModelViewer } from '@/shared/components/common/ModelViewer';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { SelectThreeDModel } from '@/shared/components/features/SelectThreeDModel';
import { useGetArAsset } from '@/shared/hooks/restapi/v1/ArAssets';
import { useForm } from '@/shared/hooks/useForm';
import { useDisclosure } from '@/shared/lib/mantine';
import { useLoading } from '@/shared/providers/loading';

const schema = z.object({
  threeDModel: z.string(),
});

const fileInputSchema = z.object({
  fileInput: z.string(),
});

type FormSchemaType = z.infer<typeof schema>;
type FileInputSchemaType = z.infer<typeof fileInputSchema>;

type Props = {
  id: string;
};

export const Display3dModel = ({ id }: Props) => {
  const { data, error, isLoading } = useGetArAsset(id);
  const [opened, { open, close }] = useDisclosure(false);
  const { open: openLoading, close: closeLoading } = useLoading();
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

  useEffect(() => {
    if (isLoading) openLoading();
    if (!isLoading) closeLoading();
    return () => closeLoading();
  }, [closeLoading, isLoading, openLoading]);

  return (
    <Stack gap={0}>
      <Title order={5} c="blue.6" mb={4}>
        3Dモデルデータ
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        3Dモデルデータを登録すると、QRコードから3DモデルをARとして表示させることができます。
      </Text>
      <Group justify="center" mt={8}>
        <ModelViewer
          glb={data?.threeDimentionalPath ?? ''}
          alt={`${data?.threeDimentionalPath} 3d model`}
          poster={''}
        >
          <Button slot="ar-button" display="none" />
        </ModelViewer>

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
