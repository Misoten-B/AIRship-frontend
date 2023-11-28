import { QRCodeSVG } from 'qrcode.react';

type Props = {
  url: string;
  imageSrc: string;
};
export const QRCode = (props: Props) => {
  const { url, imageSrc } = props;
  return (
    <QRCodeSVG
      value={url}
      size={128}
      bgColor={'#ffffff'}
      fgColor={'#000000'}
      level={'L'}
      includeMargin={true}
      imageSettings={{
        src: imageSrc,
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        excavate: true,
      }}
    />
  );
};
