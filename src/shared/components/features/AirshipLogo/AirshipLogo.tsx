import { ImageProps } from '@mantine/core';
import { Image } from '../../common/Image';

type Props = Omit<ImageProps, 'src' | 'alt'>;
export const AirshipLogo = (props: Props) => {
  return <Image src="/logo.svg" alt="airship logo" {...props} />;
};
