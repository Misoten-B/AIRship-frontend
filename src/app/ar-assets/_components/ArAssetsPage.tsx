'use client';
import Link from 'next/link';
import { ArAssetList } from './ArAssetList';
import { Container } from '@/shared/components/common/Container';
import { Image } from '@/shared/components/common/Image';
import { Center, Grid } from '@/shared/components/common/Layout';
import { Anchor } from '@/shared/components/common/Navigation';
import { ROUTES } from '@/shared/constants';

export const ArAssetsPage = () => {
  return (
    <Container p={0}>
      {/* <Flex
        gap="xs"
        p={12}
        m={12}
        styles={{
          root: { borderRadius: '12px' },
        }}
      > */}
      <Grid pb="md">
        <Grid.Col span={4}>
          <Anchor component={Link} href={ROUTES.record.base} className="step">
            <Image src="/step/record.svg" alt="record" />
          </Anchor>
        </Grid.Col>
        <Grid.Col span={4}>
          <Anchor
            component={Link}
            href={ROUTES.arAssets.create}
            className="step"
          >
            <Image src="/step/qrcode.svg" alt="qrcode" />
          </Anchor>
        </Grid.Col>
        <Grid.Col span={4}>
          <Anchor component={Link} href={ROUTES.cards.create} className="step">
            <Image src="/step/card.svg" alt="card" />
          </Anchor>
        </Grid.Col>
      </Grid>
      <style>{`
        .step:hover {
          transition : .2s;
          background: #00000008;
          borderRadius: '18px'
        }
      `}</style>
      {/* </Flex> */}
      <Center>
        <ArAssetList />
      </Center>
    </Container>
  );
};
