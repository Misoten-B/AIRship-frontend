import { QRCodeSVG } from 'qrcode.react';
import { RefObject, useState } from 'react';
import { Center, Paper } from '../Layout';
import { AspectRatio } from '../Layout/AspectRatio';

type Props = {
  url: string;
  size: number;
  imagesrc?: string;
  style?: React.CSSProperties;
  qrRef?: RefObject<HTMLDivElement>;
};
export const QRCode = (props: Props) => {
  const { url, imagesrc: imageSrc, size, qrRef } = props;

  const [src, setSrc] = useState(imageSrc ?? '/airship-logo-column.svg');

  return (
    <Center {...props}>
      <Paper
        ref={qrRef}
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
              setSrc('/airship-logo-column.svg');
            }}
            {...(imageSrc && {
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
