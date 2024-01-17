'use client';
import Link from 'next/link';
import { ArAssetList } from './ArAssetList';
import { Container } from '@/shared/components/common/Container';
import { Image } from '@/shared/components/common/Image';
import { Center, Grid } from '@/shared/components/common/Layout';
import { Anchor } from '@/shared/components/common/Navigation';
import { ROUTES } from '@/shared/constants';
import { useMediaQuery } from '@/shared/lib/mantine';

export const ArAssetsPage = () => {
  const isPC = useMediaQuery('(min-width: 768px)');

  const imagePaths = {
    record: isPC ? '/step/record-pc.svg' : '/step/record.svg',
    qrcode: isPC ? '/step/qrcode-pc.svg' : '/step/qrcode.svg',
    card: isPC ? '/step/card-pc.svg' : '/step/card.svg',
  };

  const steps = [
    { href: ROUTES.record.base, src: imagePaths.record, alt: 'record' },
    { href: ROUTES.arAssets.create, src: imagePaths.qrcode, alt: 'qrcode' },
    { href: ROUTES.cards.create, src: imagePaths.card, alt: 'card' },
  ];

  return (
    <Container p={0}>
      <Grid pb="md">
        {steps.map((step, index) => (
          <Grid.Col key={index} span={4}>
            <Anchor component={Link} href={step.href}>
              <Image src={step.src} alt={step.alt} className="step" />
            </Anchor>
          </Grid.Col>
        ))}
      </Grid>
      <style>{`
        .step:hover {
          transition: 0.2s;
          background-color: #00000010;
          border-radius: 18px;
        }
      `}</style>
      <Center>
        <ArAssetList />
      </Center>
    </Container>
  );
};
