'use client';
import { useState } from 'react';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { AspectRatio } from '@/shared/components/common/Layout/AspectRatio';
import { BusinessCard } from '@/shared/components/features';

const cardData = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
];

export const Cards = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const diffTop = 120;
  const ButtonTop = diffTop * (cardData.length + 2);
  const height = ButtonTop;
  return (
    <Container mt={80} pos="relative" h={height}>
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
                  ? 'translateY(-80px)'
                  : selectedCard > index
                  ? 'translateY(-40px)'
                  : 'translateY(40px)',
              transition: 'transform 0.2s ease-out',
              cursor: 'pointer',
              position: 'absolute',
              top: top,
              left: '0',
            }}
            onClick={() => setSelectedCard(card.id)}
          />
        );
      })}
      <AspectRatio ratio={91 / 55} w={412} mb={20}>
        <Button variant="default" top={ButtonTop}>
          +
        </Button>
      </AspectRatio>
    </Container>
  );
};
