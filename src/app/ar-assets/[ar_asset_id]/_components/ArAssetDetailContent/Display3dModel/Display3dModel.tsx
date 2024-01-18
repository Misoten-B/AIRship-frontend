'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { Button, FileButton } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Grid, Group, Stack } from '@/shared/components/common/Layout';
import { Modal } from '@/shared/components/common/Modal';
import { ModelViewer } from '@/shared/components/common/ModelViewer';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { SelectThreeDModel } from '@/shared/components/features/SelectThreeDModel';
import { IconUpload } from '@/shared/components/icons';
import {
  useGetArAsset,
  useUpdateArAsset,
} from '@/shared/hooks/restapi/v1/ArAssets';
import { useCreateThreeDimentionalModel } from '@/shared/hooks/restapi/v1/ThreeDimentionalModel';
import { useForm } from '@/shared/hooks/useForm';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { isApiError } from '@/shared/lib/axios/errorHandling';
import { useDisclosure } from '@/shared/lib/mantine';
import { useLoading } from '@/shared/providers/loading';

const schema = z.object({
  threeDModel: z.string(),
});

type FormSchemaType = z.infer<typeof schema>;

type Props = {
  id: string;
};

export const Display3dModel = ({ id }: Props) => {
  const { data, error, isLoading, mutate } = useGetArAsset(id);
  const [opened, { open, close }] = useDisclosure(false);
  const { open: openLoading, close: closeLoading } = useLoading();
  const { control, setValue, handleSubmit } = useForm<FormSchemaType>({
    defaultValues: {
      threeDModel: '',
    },
  });
  const { infoNotification, errorNotification } = useNotifications();
  const { updateArAsset } = useUpdateArAsset(id);
  const { createThreeDimentionalModel } = useCreateThreeDimentionalModel();

  const handleSetValue = (value: string) => {
    setValue('threeDModel', value);
  };

  useEffect(() => {
    if (isLoading) openLoading();
    if (!isLoading) closeLoading();
    return () => closeLoading();
  }, [closeLoading, isLoading, openLoading]);

  const handleChange = async (payload: File | null) => {
    try {
      openLoading();
      if (!data || !payload) return;

      await createThreeDimentionalModel(payload);

      infoNotification('3Dモデルをアップロードしました');
      mutate();
    } catch (error) {
      const message = '3Dモデルのアップロードに失敗しました';

      if (isApiError(error)) {
        errorNotification(error.response?.data.error ?? message);
      } else {
        errorNotification(message);
      }
    } finally {
      closeLoading();
    }
  };

  const handleClick = async (values: FormSchemaType) => {
    try {
      openLoading();
      if (!data) return;

      await updateArAsset(data.speakingDescription, values.threeDModel);

      infoNotification('3Dモデルを更新しました');
      mutate();
      closeModal();
    } catch (error) {
      const message = '3Dモデルの更新に失敗しました';

      if (isApiError(error)) {
        errorNotification(error.response?.data.error ?? message);
      } else {
        errorNotification(message);
      }
    } finally {
      closeLoading();
    }
  };

  const openModal = () => {
    open();
    setValue('threeDModel', data?.threeDimentionalId ?? '');
  };

  const closeModal = () => {
    close();
    setValue('threeDModel', '');
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
        <ModelViewer
          glb={data?.threeDimentionalPath ?? ''}
          alt={`${data?.threeDimentionalPath} 3d model`}
          poster={''}
        >
          <Button slot="ar-button" display="none" />
        </ModelViewer>

        <Modal opened={opened} onClose={closeModal}>
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
                <FileButton
                  name="fileInput"
                  onChange={handleChange}
                  accept=".glb"
                >
                  {(props) => (
                    <Button
                      variant="outline"
                      mb="md"
                      {...props}
                      leftSection={<IconUpload />}
                    >
                      Upload
                    </Button>
                  )}
                </FileButton>
              </Grid.Col>
            </Grid>

            <Button onClick={handleSubmit(handleClick)} w="100%" radius="md">
              更新する
            </Button>
          </Container>
        </Modal>

        <Button
          variant="outline"
          color="orange"
          radius="xl"
          onClick={openModal}
        >
          更新する
        </Button>
      </Group>
    </Stack>
  );
};
