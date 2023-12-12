import { QRCodeSVG } from 'qrcode.react';
import { Center, Paper } from '../Layout';
import { AspectRatio } from '../Layout/AspectRatio';

type Props = {
  url: string;
  size: number;
  imageSrc?: string;
};
export const QRCode = (props: Props) => {
  const { url, imageSrc, size } = props;
  return (
    <Center>
      <Paper radius="md" withBorder p="md" pb={10}>
        <AspectRatio ratio={1} w={size} h={size}>
          <QRCodeSVG
            value={url}
            // size={size}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'L'}
            {...(imageSrc && {
              imageSettings: {
                src: imageSrc,
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
