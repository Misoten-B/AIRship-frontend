import { AspectRatioProps } from '@mantine/core';
import React from 'react';
import { Card, Flex, Stack } from '../common/Layout';
import { AspectRatio } from '../common/Layout/AspectRatio';
import { QRCode } from '../common/QRCode';
import { Text } from '../common/Text';

type OmitAspectRatioProps = Omit<AspectRatioProps, 'ratio' | 'w'>;
type Props = OmitAspectRatioProps & {
  text: string;
  handleClick?: () => void;
};

export const BusinessCard = ({ text, ...props }: Props) => {
  return (
    <AspectRatio
      // ratio={91 / 55}
      ratio={1253 / 756}
      w={412}
      {...props}
    >
      <Card shadow="sm" padding="lg" withBorder>
        <Flex w="100%" justify="space-around">
          <Stack>
            <Text size="lg">{text}</Text>
          </Stack>
          <QRCode
            url={'https://airship.azurewebsites.net/'}
            imageSrc="/airship-logo-column.svg"
            size={80}
          />
        </Flex>
      </Card>
    </AspectRatio>
  );
};
