'use client';
import { AspectRatioProps, CardProps } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Card } from '../../common/Layout';
import { QRCode } from '../../common/QRCode';
import { Text } from '../../common/Text';
import { BusinessCardAspectRatio } from './BusinessCardAspectRatio';
import {
  Dto_BusinessCardPartsCoordinate,
  Dto_BusinessCardResponse,
} from '@/api/@types';

type OmitAspectRatioProps = Omit<AspectRatioProps, 'ratio' | 'w'>;
type OmitCardProps = Omit<CardProps, 'shadow' | 'padding' | 'withBorder'>;
type Props = OmitAspectRatioProps & {
  card: Dto_BusinessCardResponse;
  handleClick?: () => void;
};

const scaleRatio = 3;
const defaultWidth = 1254 / scaleRatio;
const fontSize = {
  displayName: 24,
  companyName: 16,
  department: 14,
  officialPosition: 12,
  phoneNumber: 12,
  email: 12,
  postalCode: 12,
  address: 12,
};

export const BusinessCard = ({ card, handleClick, ...props }: Props) => {
  const { ref, width, height } = useElementSize();
  const [scale, setScale] = useState(1);

  // TODO: 動作確認後に削除
  const rawBusinessCardPartsCoordinate = {
    displayNameX: 112,
    displayNameY: 266,
    companyNameX: 116,
    companyNameY: 98,
    departmentX: 116,
    departmentY: 152,
    officialPositionX: 116,
    officialPositionY: 200,
    phoneNumberX: 116,
    phoneNumberY: 478,
    emailX: 116,
    emailY: 428,
    postalCodeX: 116,
    postalCodeY: 574,
    addressX: 116,
    addressY: 614,
    qrcodeX: 760,
    qrcodeY: 209,
  };

  const businessCardPartsCoordinate: Dto_BusinessCardPartsCoordinate = {
    displayNameX:
      (rawBusinessCardPartsCoordinate.displayNameX / scaleRatio) * scale,
    displayNameY:
      (rawBusinessCardPartsCoordinate.displayNameY / scaleRatio) * scale,
    companyNameX:
      (rawBusinessCardPartsCoordinate.companyNameX / scaleRatio) * scale,
    companyNameY:
      (rawBusinessCardPartsCoordinate.companyNameY / scaleRatio) * scale,
    departmentX:
      (rawBusinessCardPartsCoordinate.departmentX / scaleRatio) * scale,
    departmentY:
      (rawBusinessCardPartsCoordinate.departmentY / scaleRatio) * scale,
    officialPositionX:
      (rawBusinessCardPartsCoordinate.officialPositionX / scaleRatio) * scale,
    officialPositionY:
      (rawBusinessCardPartsCoordinate.officialPositionY / scaleRatio) * scale,
    phoneNumberX:
      (rawBusinessCardPartsCoordinate.phoneNumberX / scaleRatio) * scale,
    phoneNumberY:
      (rawBusinessCardPartsCoordinate.phoneNumberY / scaleRatio) * scale,
    emailX: (rawBusinessCardPartsCoordinate.emailX / scaleRatio) * scale,
    emailY: (rawBusinessCardPartsCoordinate.emailY / scaleRatio) * scale,
    postalCodeX:
      (rawBusinessCardPartsCoordinate.postalCodeX / scaleRatio) * scale,
    postalCodeY:
      (rawBusinessCardPartsCoordinate.postalCodeY / scaleRatio) * scale,
    addressX: (rawBusinessCardPartsCoordinate.addressX / scaleRatio) * scale,
    addressY: (rawBusinessCardPartsCoordinate.addressY / scaleRatio) * scale,
    qrcodeX: (rawBusinessCardPartsCoordinate.qrcodeX / scaleRatio) * scale,
    qrcodeY: (rawBusinessCardPartsCoordinate.qrcodeY / scaleRatio) * scale,
  };

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
        transform: `scale(${scale})`,
      }}
      {...props}
    >
      <Card
        shadow="sm"
        withBorder
        w="100%"
        h="100%"
        style={{
          transform: `scale(${scale})`,
          background: 'white',
          color: 'black',
        }}
      >
        <Text
          style={{
            fontSize: fontSize.displayName * scale,
          }}
          mb="md"
          pos="absolute"
          fw={700}
          top={businessCardPartsCoordinate?.displayNameY}
          left={businessCardPartsCoordinate?.displayNameX}
        >
          {card.displayName}
        </Text>
        <Text
          style={{
            fontSize: fontSize.companyName * scale,
          }}
          mb="md"
          pos="absolute"
          top={businessCardPartsCoordinate?.companyNameY}
          left={businessCardPartsCoordinate?.companyNameX}
        >
          {card.companyName}
        </Text>
        <Text
          style={{
            fontSize: fontSize.department * scale,
          }}
          size="sm"
          mb="md"
          pos="absolute"
          top={businessCardPartsCoordinate?.departmentY}
          left={businessCardPartsCoordinate?.departmentX}
        >
          {card.department}
        </Text>
        <Text
          style={{
            fontSize: fontSize.officialPosition * scale,
          }}
          size="xs"
          mb="md"
          pos="absolute"
          top={businessCardPartsCoordinate?.officialPositionY}
          left={businessCardPartsCoordinate?.officialPositionX}
        >
          {card.officialPosition}
        </Text>
        <Text
          style={{
            fontSize: fontSize.phoneNumber * scale,
          }}
          size="sm"
          mb="md"
          pos="absolute"
          top={businessCardPartsCoordinate?.phoneNumberY}
          left={businessCardPartsCoordinate?.phoneNumberX}
        >
          {card.phoneNumber}
        </Text>
        <Text
          style={{
            fontSize: fontSize.email * scale,
          }}
          size="sm"
          mb="md"
          pos="absolute"
          top={businessCardPartsCoordinate?.emailY}
          left={businessCardPartsCoordinate?.emailX}
        >
          {card.email}
        </Text>
        <Text
          style={{
            fontSize: fontSize.postalCode * scale,
          }}
          size="sm"
          mb="md"
          pos="absolute"
          top={businessCardPartsCoordinate?.postalCodeY}
          left={businessCardPartsCoordinate?.postalCodeX}
        >
          〒{card.postalCode}
        </Text>
        <Text
          style={{
            fontSize: fontSize.address * scale,
          }}
          size="sm"
          mb="md"
          pos="absolute"
          top={businessCardPartsCoordinate?.addressY}
          left={businessCardPartsCoordinate?.addressX}
        >
          {card.address}
        </Text>

        <QRCode
          url={'https://airship.azurewebsites.net/'}
          imageSrc="/airship-logo-column.svg"
          size={90 * scale}
          style={{
            position: 'absolute',
            top: businessCardPartsCoordinate?.qrcodeY,
            left: businessCardPartsCoordinate?.qrcodeX,
          }}
        />
      </Card>
    </BusinessCardAspectRatio>
  );
};
