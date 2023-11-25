import { ImageProps } from '@mantine/core';
import { Image } from '../common/Image';

type Props = Omit<ImageProps, 'src' | 'alt'>;
export const AirshipMainVisual = (props: Props) => {
  return <Image src="/mainvisual.jpg" alt="airship main visual" {...props} />;
};
