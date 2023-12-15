'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Flex } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { BusinessCard } from '@/shared/components/features';
import { BusinessCardAspectRatio } from '@/shared/components/features/BusinessCard/BusinessCardAspectRatio';
import { useGetBusinessCards } from '@/shared/hooks/restapi/v1/BusinessCard';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

const defaultBusinessCardWidht = 379;
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

  // const ButtonTop = diffTop * (cardData.length + 1) + 40;
  // const height = ButtonTop + 200;

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
          <BusinessCard key={card.id} text={card.displayName ?? '名無し'} />
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
              text={card.displayName ?? '名無し'}
              style={{
                zIndex: data.length + index,
                transform:
                  // selectedCard === card.id
                  selectedCard === 1
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
              // onClick={() => setSelectedCard(card.id)}
              onClick={() => setSelectedCard(1)}
            />
          );
        })}
        <BusinessCardAspectRatio w={defaultBusinessCardWidht} m={0}>
          <Button variant="default" top={ButtonTop}>
            +
          </Button>
        </BusinessCardAspectRatio>
      </Center>
    </Container>
  );
};
