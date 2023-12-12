'use client';
import { AspectRatioProps, CardProps } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Card, Flex, Stack } from '../../common/Layout';
import { QRCode } from '../../common/QRCode';
import { Text } from '../../common/Text';
import { BusinessCardAspectRatio } from './BusinessCardAspectRatio';

type OmitAspectRatioProps = Omit<AspectRatioProps, 'ratio' | 'w'>;
type OmitCardProps = Omit<CardProps, 'shadow' | 'padding' | 'withBorder'>;
type Props = OmitAspectRatioProps & {
  text: string;
  handleClick?: () => void;
};

export const BusinessCard = ({ text, ...props }: Props) => {
  const { ref, width, height } = useElementSize();
  const [scale, setScale] = useState(1);
  const defaultWidth = 379;

  useEffect(() => {
    if (width && height) {
      const scale = width / defaultWidth;
      setScale(scale);
    }
  }, [height, width]);

  return (
    <BusinessCardAspectRatio
      w={defaultWidth}
      ref={ref}
      style={{
        cursor: 'pointer',
      }}
      {...props}
    >
      <Card
        shadow="sm"
        padding="lg"
        withBorder
        w="100%"
        h="100%"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <Flex w="100%" h="100%" justify="space-around">
          <Stack>
            <Text size="lg">{text}</Text>
          </Stack>
          <QRCode
            url={'https://airship.azurewebsites.net/'}
            imageSrc="/airship-logo-column.svg"
            size={80 * scale}
          />
        </Flex>
      </Card>
    </BusinessCardAspectRatio>
  );
};
