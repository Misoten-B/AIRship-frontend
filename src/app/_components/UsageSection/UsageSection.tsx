'use client';

import classes from './UsageSection.module.css';
import { Container } from '@/shared/components/common/Container';
import { Image } from '@/shared/components/common/Image';
import { SimpleGrid } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

type UsageSectionItemProps = {
  src: string;
  title: string;
  description: string;
  className?: string;
};

export const UsageSectionItem: React.FC<UsageSectionItemProps> = ({
  src,
  title,
  description,
  className,
  ...others
}) => {
  return (
    <div {...others}>
      <div className={classes.content}>
        <Image
          src={'/introduce/' + src}
          alt={title}
          styles={{
            root: { width: '40%' },
          }}
        />
        <Text fw={700} fz="lg" m={16} className={classes.itemtitle}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm" px={16}>
          {description}
        </Text>
      </div>
    </div>
  );
};

const createData = [
  {
    src: 'record.svg',
    title: '音声登録',
    description:
      '5秒ほどの録音を行うことで、自分の声をAI化する事が可能です。このAI化された声を用いて、好きな言葉を話させることができます。',
  },
  {
    src: 'qrcode.svg',
    title: 'QRコード作成',
    description:
      '表示する3DモデルとAI化した声に喋らせる文章を登録し、QRコードを生成させます。',
  },
  {
    src: 'card.svg',
    title: '名刺作成',
    description:
      '名前、会社名、電話番号など名刺に必要なデータを入力し、作成したQRコードを選択します。背景画像のカスタムしてその人だけの名刺を作成することが可能です。',
  },
];

const viewDate = [
  {
    src: 'camera.svg',
    title: 'AIRshipの名刺を受け取る',
    description: 'QRコードが記載されたAIRshipの名刺を受け取ります。',
  },
  {
    src: 'camera.svg',
    title: 'カメラを起動',
    description: 'カメラを起動します。',
  },
  {
    src: 'viewqrcode.svg',
    title: 'QRを読み取る',
    description:
      '名刺に記載されたQRコードを読み取ることで、AI化された声、3DモデルのデータをARで閲覧できます。',
  },
];

export const UsageSection: React.FC = () => {
  const createDataItems = createData.map((item) => (
    <UsageSectionItem {...item} key={item.title} />
  ));
  const viewDataItems = viewDate.map((item) => (
    <UsageSectionItem {...item} key={item.title} />
  ));

  return (
    <Container mt={30} mb={30} pb={40} size="lg">
      <Text className={classes.supTitle}>Create business cards</Text>

      <Title className={classes.title} order={2} mb="32">
        名刺の作成の流れ
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {createDataItems}
      </SimpleGrid>

      <Text className={classes.supTitle} mt={40}>
        Viewing business cards
      </Text>

      <Title className={classes.title} order={2} mb="32">
        名刺の閲覧の流れ
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {viewDataItems}
      </SimpleGrid>
    </Container>
  );
};
