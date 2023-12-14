import { ARAsset } from '../_types';
import { ArAssetCard } from './ArAssetCard';
import { SimpleGrid } from '@/shared/components/common/Layout';

const arAssets = [
  {
    id: 'string1',
    qrcode_image_path: '/airship-logo-column.svg',
    speaking_audio_path: 'https://airship.azurewebsites.net/',
    speaking_description:
      '私の名前は山田太郎です。好きなことはゲームをすることとカラオケで歌を歌うことです。長所は笑顔で接することです',
    three_dimentional_path: 'https://airship.azurewebsites.net/',
  },
  {
    id: 'string2',
    qrcode_image_path: '/airship-logo-column.svg',
    speaking_audio_path: 'https://airship.azurewebsites.net/',
    speaking_description:
      '私の名前は山田二郎です。好きなことはゲームをすることとカラオケで歌を歌うことです。長所は笑顔で接することです',
    three_dimentional_path: 'https://airship.azurewebsites.net/',
  },
] as const satisfies ARAsset[];

export const ArAssetGrid = async () => {
  await sleep(3000);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {arAssets.map((arAsset) => (
        <ArAssetCard key={arAsset.id} arAsset={arAsset} />
      ))}
    </SimpleGrid>
  );
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
