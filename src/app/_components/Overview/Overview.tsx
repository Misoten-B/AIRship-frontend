'use client';

import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './Overview.module.css';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Image } from '@/shared/components/common/Image';
import { Group } from '@/shared/components/common/Layout';
import { List } from '@/shared/components/common/List';
import { Text } from '@/shared/components/common/Text';
import { ThemeIcon } from '@/shared/components/common/ThemeIcon';
import { Title } from '@/shared/components/common/Title';

import { AirshipLogoRow } from '@/shared/components/features/AirshipLogo';
import { ROUTES } from '@/shared/constants';
import { useMediaQuery } from '@/shared/lib/mantine';
import { rem } from '@/shared/utils/converter';

export const Overview = () => {
  const isPC = useMediaQuery('(min-width: 768px)');
  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <AirshipLogoRow w={isPC ? '200' : '150'} />
          <Title className={classes.title}>
            声と立体感、
            <br />
            あなたらしさを表現
            <br />
            <span className={classes.highlight}>次世代の名刺アプリ</span>
            <br />
          </Title>
          <Text c="dimmed" mt="md" size={isPC ? 'sm' : 'xs'}>
            「AIRship」は、AI化した声とARを含んだ名刺を作成できるスマートフォン向けの次世代の名刺webアプリケーションです。QRコードを読み取ることで、登録した3DモデルやAI化した声を聞くことができます。
          </Text>

          <List
            mt={isPC ? '30' : '12'}
            spacing="sm"
            size={isPC ? 'sm' : 'xs'}
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>AR</b> –
              登録した3Dモデルを、拡張現実（AR）技術を用いてアプリ上で表示、閲覧することができます。
            </List.Item>
            <List.Item>
              <b>AI</b> –
              10秒ほどの録音で自分の声をAI化して好きな文章を話させることができます。
            </List.Item>
          </List>

          <Group mt={isPC ? '30' : '18'}>
            <Button
              variant="gradient"
              size={isPC ? 'xl' : 'sm'}
              radius="xl"
              className={classes.control}
              component={Link}
              href={ROUTES.register.base}
            >
              AIRshipを始める
            </Button>
          </Group>
        </div>
        <Image
          src="/introduce/introduce.svg"
          alt="introduce"
          h={isPC ? '100%' : '200'}
          {...(isPC
            ? {}
            : {
                styles: {
                  root: { width: '280px' },
                },
              })}
        />
      </div>
    </Container>
  );
};
