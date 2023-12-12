'use client';
import { useDisclosure } from '@mantine/hooks';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Divider } from '@/shared/components/common/Divider';
import { Image } from '@/shared/components/common/Image';
import { FileInput } from '@/shared/components/common/Input';
import { Grid, Group, Stack } from '@/shared/components/common/Layout';
import { Modal } from '@/shared/components/common/Modal';
import { Radio } from '@/shared/components/common/Radio';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';
import { useForm } from '@/shared/hooks/useForm';

export const Display3dModel = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const mock3dModels: { id: number; imageSrc: string }[] = [
    {
      id: 1,
      imageSrc: '/3d_model_image.svg',
    },
    {
      id: 2,
      imageSrc: '/3d_model_image.svg',
    },
    {
      id: 3,
      imageSrc: '/3d_model_image.svg',
    },
  ];
  const { control } = useForm();
  const sampleModels = mock3dModels;
  const uploadedModels = mock3dModels;
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

            <Grid gutter="sm">
              {sampleModels.map(({ id, imageSrc }) => {
                return (
                  <Grid.Col key={id} span={4}>
                    <Stack gap="sm" align="center">
                      <Image src={imageSrc} alt={`${id} 3d model`} />
                      {/* TODO: wip */}
                      <Radio name="" control={control} size="xs" />
                    </Stack>
                  </Grid.Col>
                );
              })}
            </Grid>
            <Divider my="sm" labelPosition="center" />

            <Title order={5} mb={4} c="dark">
              アップロードした3Dモデル
            </Title>
            <Text size="xs" c="gray.6" mb={12}>
              自分でアップロードした3Dモデルになっております。
            </Text>
            <Grid>
              {uploadedModels.map(({ id, imageSrc }) => {
                return (
                  <Grid.Col key={id} span={4}>
                    <Stack gap="sm" align="center">
                      <Image src={imageSrc} alt={`${id} 3d model`} />
                      {/* TODO: wip */}
                      <Radio name="" control={control} size="xs" />
                    </Stack>
                  </Grid.Col>
                );
              })}
              <Grid.Col span={4}>
                <FileInput
                  // TODO: wip
                  name=""
                  control={control}
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
