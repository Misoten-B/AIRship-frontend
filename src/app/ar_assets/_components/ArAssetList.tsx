'use client';
import { ArAssetCard } from './ArAssetCard';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import {
  Center,
  Flex,
  SimpleGrid,
  Stack,
} from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';

const arAssets = [
  {
    url: 'https://airship.azurewebsites.net/',
    text: '私の名前は山田太郎です。好きなことはゲームをすることとカラオケで歌を歌うことです。長所は笑顔で接することです',
    id: 'string',
  },
  {
    url: 'https://airship.azurewebsites.net/',
    text: '私の名前は山田太郎です。好きなことはゲームをすることとカラオケで歌を歌うことです。長所は笑顔で接することです',
    id: 'string',
  },
];

export const ArAssetList = () => {
  return (
    <Container bg="blue.1" p={0}>
      <Center bg="white">
        <Flex gap={8} px={24} py={12} mb={16}>
          <Stack gap={0}>
            <Text size="xs" c="orange" ta="center" mb={4}>
              3Dモデルと話させる文章を登録して QRコード化させます
            </Text>
            <Button
              variant="filled"
              color="orange"
              size="md"
              radius="xl"
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
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {arAssets.map((arAsset, index) => (
              <ArAssetCard
                text={arAsset.text}
                key={arAsset.id}
                url={arAsset.url}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Center>
    </Container>
  );
};
