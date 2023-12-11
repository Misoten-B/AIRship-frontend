import { Button } from '@/shared/components/common/Button';
import { Image } from '@/shared/components/common/Image';
import { Group, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

export const Display3dModel = () => {
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
        <Button variant="outline" color="orange" radius="xl">
          選択する
        </Button>
      </Group>
    </Stack>
  );
};
