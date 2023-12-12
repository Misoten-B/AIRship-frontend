import { AspectRatioProps } from '@mantine/core';
import { AspectRatio } from '../../common/Layout/AspectRatio';

type OmittedAspectRatioProps = Omit<AspectRatioProps, 'ratio'>;

type Props = OmittedAspectRatioProps & {
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
};

export const BusinessCardAspectRatio = ({ ref, children, ...props }: Props) => {
  return (
    <AspectRatio ratio={1253 / 758} ref={ref} {...props}>
      {children}
    </AspectRatio>
  );
};
