import { ImageProps } from '@mantine/core';
import { Image } from '../../common/Image';

type Props = Omit<ImageProps, 'src' | 'alt'>;
export const AirshipTitle = (props: Props) => {
  return <Image src="/title.svg" alt="airship" {...props} />;
};
