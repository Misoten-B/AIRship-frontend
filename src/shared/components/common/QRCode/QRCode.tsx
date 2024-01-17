'use client';

import { QRCodeSVG } from 'qrcode.react';
import { RefObject, useState } from 'react';
import { Center, Paper } from '../Layout';
import { AspectRatio } from '../Layout/AspectRatio';

type Props = {
  url: string;
  size: number;
  imagesrc?: string;
  style?: React.CSSProperties;
  qrref?: RefObject<HTMLDivElement>;
};
export const QRCode = (props: Props) => {
  const { url, imagesrc: imageSrc, size, qrref } = props;

  const [src, setSrc] = useState(imageSrc);

  return (
    <Center {...props}>
      <Paper
        ref={qrref}
        radius="md"
        p="md"
        pb={10}
        style={{ backgroundColor: 'white', border: '1px solid gray' }}
      >
        <AspectRatio ratio={1} w={size} h={size}>
          <QRCodeSVG
            value={url}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'L'}
            onError={() => {
              setSrc('');
            }}
            {...(src && {
              imageSettings: {
                src: src,
                x: undefined,
                y: undefined,
                height: size / 4.5,
                width: size / 4.5,
                excavate: true,
              },
            })}
          />
        </AspectRatio>
      </Paper>
    </Center>
  );
};
