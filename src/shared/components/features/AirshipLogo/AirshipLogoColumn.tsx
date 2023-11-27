import { ImageProps } from '@mantine/core';
import { Image } from '../../common/Image';

type Props = Omit<ImageProps, 'src' | 'alt'>;
export const AirshipLogoColumn = (props: Props) => {
  return <Image src="/airship-logo-column.svg" alt="airship logo" {...props} />;
};
