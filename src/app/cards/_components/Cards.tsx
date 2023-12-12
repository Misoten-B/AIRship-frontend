'use client';
import { useState } from 'react';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Center, Flex } from '@/shared/components/common/Layout';
import { BusinessCard } from '@/shared/components/features';
import { BusinessCardAspectRatio } from '@/shared/components/features/BusinessCard/BusinessCardAspectRatio';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

const cardData = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
];

export const Cards = () => {
  const isPC = useMediaQuery('(min-width: 768px)');
  const defaultBusinessCardWidht = 379;
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const diffTop = 120;
  const ButtonTop = diffTop * (cardData.length + 1) + 40;
  const height = ButtonTop + 200;
  return isPC ? (
    <Container w={'100%'}>
      <Flex w="100%" wrap="wrap" gap="lg" justify="space-around">
        {cardData.map((card, index) => (
          <BusinessCard key={card.id} text={card.name} />
        ))}
        <BusinessCardAspectRatio w={defaultBusinessCardWidht}>
          <Button variant="default">+</Button>
        </BusinessCardAspectRatio>
      </Flex>
    </Container>
  ) : (
    <Container mt={80} pos="relative" h={height}>
      <Center>
        {cardData.map((card, index) => {
          const top = index * diffTop;
          return (
            <BusinessCard
              key={card.id}
              text={card.name}
              style={{
                zIndex: cardData.length + index,
                transform:
                  selectedCard === card.id
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
              onClick={() => setSelectedCard(card.id)}
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
