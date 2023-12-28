'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Flex } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { BusinessCard } from '@/shared/components/features';
import { BusinessCardAspectRatio } from '@/shared/components/features/BusinessCard/BusinessCardAspectRatio';
import { ROUTES } from '@/shared/constants';
import { useGetBusinessCards } from '@/shared/hooks/restapi/v1/BusinessCard';
import { useMediaQuery } from '@/shared/lib/mantine';

const defaultBusinessCardWidht = 1254 / 3;
const diffTop = 120;

type State = {
  selectedCard: number;
};

const initialState: State = {
  selectedCard: 0,
};

export const Cards = () => {
  const { data, error, isLoading } = useGetBusinessCards();

  const isPC = useMediaQuery('(min-width: 768px)');
  const [selectedCard, setSelectedCard] = useState(initialState.selectedCard);

  // 計算が重くないから必要ないかも
  const ButtonTop = useMemo(() => {
    const length = data?.length ?? 0;
    return diffTop * (length + 1) + 40;
  }, [data]);

  const height = useMemo(() => {
    return ButtonTop + 40;
  }, [ButtonTop]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader />;

  if (!data) return null;

  return isPC ? (
    <Container w={'100%'}>
      <Flex w="100%" wrap="wrap" gap="lg" justify="space-around">
        {data.map((card) => (
          <BusinessCard key={card.id} card={card} />
        ))}
        <BusinessCardAspectRatio w={defaultBusinessCardWidht}>
          <Button variant="default">+</Button>
        </BusinessCardAspectRatio>
      </Flex>
    </Container>
  ) : (
    <Container mt={80} pos="relative" h={height}>
      <Center>
        {data.map((card, index) => {
          const top = index * diffTop;
          return (
            <BusinessCard
              key={card.id}
              card={card}
              style={{
                zIndex: data.length + index,
                transform:
                  selectedCard === index
                    ? 'translate(-50%, -80px)'
                    : selectedCard > index
                    ? 'translate(-50%, -40px)'
                    : 'translate(-50%, 40px)',
                transition: 'transform 0.2s ease-out',
                cursor: 'pointer',
                position: 'absolute',
                top: top,
                left: '50%',
              }}
              onClick={() => setSelectedCard(index)}
            />
          );
        })}
        <BusinessCardAspectRatio w={defaultBusinessCardWidht} m={0}>
          <Button component={Link} href={ROUTES.cards.create}>
            +
          </Button>
        </BusinessCardAspectRatio>
      </Center>
    </Container>
  );
};
