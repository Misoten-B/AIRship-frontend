import { Container } from '@/shared/components/common/Container';
import { Divider } from '@/shared/components/common/Divider';
import { Image } from '@/shared/components/common/Image';
import { FileInput, Radio } from '@/shared/components/common/Input';
import { Grid, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

export const Select3dModel = () => {
  return (
    <Container>
      <Title order={3} c="blue.6" mb={16}>
        3Dモデルの選択
      </Title>
      <Title order={5} c="blue.6" mb={4}>
        サンプル3Dモデル
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        用意できる3Dモデルがない場合はサンプルからお選びください
      </Text>

      <Grid gutter="sm">
        <Grid.Col span={4}>
          <Stack gap="sm" align="center">
            <Image src="/3dmodel_image.svg" alt="#" />
            <Radio size="xs" />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack gap="sm" align="center">
            <Image src="/3dmodel_image.svg" alt="#" />
            <Radio size="xs" />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack gap="sm" align="center">
            <Image src="/3dmodel_image.svg" alt="#" />
            <Radio size="xs" />
          </Stack>
        </Grid.Col>
      </Grid>
      <Divider my="sm" labelPosition="center"></Divider>

      <Title order={5} c="blue.6" mb={4}>
        アップロードした3Dモデル
      </Title>
      <Text size="xs" c="gray.6" mb={12}>
        自分でアップロードした3Dモデルを選択するにはアップロードする必要があります
      </Text>
      <Grid>
        <Grid.Col span={4}>
          <Stack gap="sm" align="center">
            <Image src="/3dmodel_image.svg" alt="#" />
            <Radio size="xs" />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack gap="sm" align="center">
            <Image src="/3dmodel_image.svg" alt="#" />
            <Radio size="xs" />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <FileInput
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
