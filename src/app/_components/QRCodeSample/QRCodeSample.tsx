'use client';

import Link from 'next/link';
import classes from './QRCodeSample.module.css';
import { Button } from '@/shared/components/common/Button';
import { Image } from '@/shared/components/common/Image';
import { Group } from '@/shared/components/common/Layout';
import { Text } from '@/shared/components/common/Text';
import { Title } from '@/shared/components/common/Title';

import { ROUTES } from '@/shared/constants';
import { useMediaQuery } from '@/shared/lib/mantine';

export const QRCodeSample = () => {
  const isPC = useMediaQuery('(min-width: 768px)');
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <Title className={classes.title} mt={18}>
          Try it
        </Title>
        <Text c="dimmed" mb="md" size={isPC ? 'sm' : 'xs'} ta="center">
          作成したQRコードのサンプルです。
          <br />
          このQRコードを読み取って新たなWAVEを体験してみよう！
        </Text>
        <div className={classes.content}>
          <Image src="/introduce/qr-code.png" alt="introduce" />
          <Group mt={30}>
            <Button
              variant="gradient"
              radius="xl"
              className={classes.control}
              component={Link}
              href={ROUTES.register.base}
            >
              AIRshipを始める
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
};
