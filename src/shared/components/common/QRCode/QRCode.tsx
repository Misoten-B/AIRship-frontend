import { QRCodeSVG } from 'qrcode.react';
import { Center, Paper } from '../Layout';

type Props = {
  url: string;
  imageSrc: string;
  size: number;
};
export const QRCode = (props: Props) => {
  const { url, imageSrc, size } = props;
  return (
    <Center>
      <Paper radius="md" withBorder p="md" pb={10}>
        <QRCodeSVG
          value={url}
          size={size}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          imageSettings={{
            src: imageSrc,
            x: undefined,
            y: undefined,
            height: size / 4.5,
            width: size / 4.5,
            excavate: true,
          }}
        />
      </Paper>
    </Center>
  );
};
