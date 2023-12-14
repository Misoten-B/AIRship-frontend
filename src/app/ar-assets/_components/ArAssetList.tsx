import Link from 'next/link';
import { Suspense } from 'react';
import { ArAssetGrid } from './ArAssetGrid';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Flex, Stack } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { Text } from '@/shared/components/common/Text';
import { ROUTES } from '@/shared/constants';

export const ArAssetList = () => {
  return (
    <Container p={0}>
      <Center bg="white">
        <Flex gap={8} px={24} py={12} mb={16}>
          <Stack gap={0}>
            <Text size="xs" c="orange" ta="center" mb={4}>
              3Dモデルと話させる文章を登録して QRコード化させます
            </Text>
            <Button
              color="orange"
              component={Link}
              href={ROUTES.arAssets.create}
              radius="xl"
              size="md"
              variant="filled"
              w="100%"
            >
              <Text>QRコードの新規作成</Text>
            </Button>
          </Stack>
          <Stack gap={0}>
            <Text size="xs" c="blue" ta="center" mb={4}>
              5秒ほど自分の声を登録するとAI化されます
            </Text>
            <Button variant="filled" size="md" radius="xl" w="100%">
              <Text>声を登録する</Text>
            </Button>
          </Stack>
        </Flex>
      </Center>
      <Center>
        <Flex justify="space-around" direction="column">
          <Suspense fallback={<Loader />}>
            <ArAssetGrid />
          </Suspense>
        </Flex>
      </Center>
    </Container>
  );
};
