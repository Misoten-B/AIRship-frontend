'use client';
import { ArAssetCard } from './ArAssetCard';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Flex, Grid, Stack } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';

export const ArAssetList = () => {
  return (
    <Container bg="blue.1" p={0}>
      <Flex gap={8} justify="center" px={24} py={12} bg="white" mb={16}>
        <Stack gap={0}>
          <Text size="xs" c="orange" ta="center" mb={4}>
            3Dモデルと話させる文章を登録して QRコード化させます
          </Text>
          <Button variant="filled" color="orange" size="md" radius="xl">
            <Text>QRコードの新規作成</Text>
          </Button>
        </Stack>
        <Stack gap={0}>
          <Text size="xs" c="blue" ta="center" mb={4}>
            5秒ほど自分の声を登録すると 自分の声がAI化されます
          </Text>
          <Button variant="filled" size="md" radius="xl" w={160}>
            <Text>声を登録する</Text>
          </Button>
        </Stack>
      </Flex>
      <Grid px={16}>
        <ArAssetCard />
        <ArAssetCard />
        <ArAssetCard />
        <ArAssetCard />
      </Grid>
    </Container>
  );
};
