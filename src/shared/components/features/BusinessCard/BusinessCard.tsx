'use client';
import { AspectRatioProps } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconMail, IconPhone } from '@tabler/icons-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Card } from '../../common/Layout';
import { QRCode } from '../../common/QRCode';
import { Text } from '../../common/Text';
import { getQRCodeUrl } from '../QRCode';
import { BusinessCardAspectRatio } from './BusinessCardAspectRatio';
import { recoilScaleState } from './atom';
import {
  Dto_BusinessCardPartsCoordinate,
  Dto_BusinessCardResponse,
} from '@/api/@types';

type OmitAspectRatioProps = Omit<AspectRatioProps, 'ratio' | 'w'>;
type Props = OmitAspectRatioProps & {
  card: Dto_BusinessCardResponse;
  handleClick?: () => void;
};

const scaleRatio = 3;
const defaultWidth = 1254 / scaleRatio;
const fontSize = {
  displayName: 24,
  companyName: 14,
  department: 12,
  officialPosition: 12,
  phoneNumber: 12,
  email: 12,
  postalCode: 12,
  address: 12,
};

const createScaledCoordinate = (value: number, scale: number) =>
  (value / scaleRatio) * scale;

type BusinessCardPartsCoordinate = keyof NonNullable<
  Omit<Dto_BusinessCardPartsCoordinate, 'id'>
>;

export const BusinessCard = ({ card, handleClick, ...props }: Props) => {
  const { ref, width, height } = useElementSize();
  const [scale, setScale] = useState(width / defaultWidth);
  const [recoilScale, setRecoilScale] =
    useRecoilState<number>(recoilScaleState);

  useEffect(() => {
    if (width) {
      const scale = width / defaultWidth;
      setScale(scale);
      setRecoilScale(scale);
    }
  }, [setRecoilScale, width]);

  useEffect(() => {
    setRecoilScale(scale);
  }, [recoilScale, scale, setRecoilScale]);

  // バックエンドの座標を、フロントに合わせて1/3に縮小する
  const businessCardPartsCoordinate: Record<
    BusinessCardPartsCoordinate,
    number
  > = useMemo(
    () =>
      Object.keys(card.businessCardPartsCoordinate || {})
        .filter((key) => key !== 'id')
        .reduce(
          (acc: Record<BusinessCardPartsCoordinate, number>, key) => {
            const coordinateKey = key as BusinessCardPartsCoordinate;
            acc[coordinateKey] = createScaledCoordinate(
              card.businessCardPartsCoordinate?.[coordinateKey]!,
              scale,
            );
            return acc;
          },
          {} as Record<BusinessCardPartsCoordinate, number>,
        ),
    [card.businessCardPartsCoordinate, scale],
  );

  if (!card.businessCardPartsCoordinate) return null;

  const choiceIcon = (key: keyof typeof fontSize) => {
    if (key === 'phoneNumber')
      return <IconPhone size={fontSize[key]} style={{ verticalAlign: -1 }} />;
    if (key === 'email')
      return <IconMail size={fontSize[key]} style={{ verticalAlign: -3 }} />;
    if (key === 'postalCode') return '〒';
    return null;
  };

  const renderText = (key: keyof typeof fontSize) => (
    <Text
      style={{
        fontSize: fontSize[key] * scale,
      }}
      key={key}
      mb="md"
      pos="absolute"
      top={businessCardPartsCoordinate?.[`${key}Y`]}
      left={businessCardPartsCoordinate?.[`${key}X`]}
    >
      {card[key] && choiceIcon(key)}
      {card[key]}
    </Text>
  );

  return (
    <BusinessCardAspectRatio
      w={defaultWidth}
      miw="100px"
      ref={ref}
      style={{
        cursor: 'pointer',
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
          backgroundColor: card.businessCardBackgroundColor || 'white',
          color: 'black',
          backgroundImage: `url(${card.businessCardBackgroundImage})`,
          backgroundSize: 'contain',
        }}
      >
        {Object.keys(fontSize).map((key) =>
          renderText(key as keyof typeof fontSize),
        )}

        <QRCode
          url={getQRCodeUrl(card.arAssetId)}
          imagesrc={card.qrcodeImagePath || ''}
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
