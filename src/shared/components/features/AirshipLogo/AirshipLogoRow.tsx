import { ImageProps } from '@mantine/core';
import { Image } from '../../common/Image';

type Props = Omit<ImageProps, 'src' | 'alt'>;
export const AirshipLogoRow = (props: Props) => {
  return <Image src="/airship-logo-row.svg" alt="airship logo" {...props} />;
};
