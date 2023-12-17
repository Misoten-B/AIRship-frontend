import { ImageProps } from '@mantine/core';
import { Image } from '@/shared/components/common/Image';

type Props = Omit<ImageProps, 'src' | 'alt'>;
export const SampleQrCodeImage = (props: Props) => {
  return (
    <Image
      src="/sanple-qrcode-image.svg"
      alt="sample qrcode image"
      {...props}
    />
  );
};
