import { useForm } from 'react-hook-form';
import { Container } from '@/shared/components/common/Container';
import { Divider } from '@/shared/components/common/Divider';
import { Image } from '@/shared/components/common/Image';
import { FileInput } from '@/shared/components/common/Input';
import { Grid, Stack } from '@/shared/components/common/Layout';
import { Radio } from '@/shared/components/common/Radio';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

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

type Props = {};
export const Select3dModel = ({}: Props) => {
  // TODO: wip
  const { control } = useForm();
  const sampleModels = mock3dModels;
  const uploadedModels = mock3dModels;
  return (
    <Container>
      <Title order={3} mb={16}>
        3Dモデルの選択
      </Title>
      <Title order={5} mb={4}>
        サンプル3Dモデル
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        用意できる3Dモデルがない場合はサンプルからお選びください
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

      <Title order={5} mb={4}>
        アップロードした3Dモデル
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        自分でアップロードした3Dモデルを選択するにはアップロードする必要があります
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
    </Container>
  );
};
