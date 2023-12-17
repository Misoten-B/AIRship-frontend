import { AspectRatioProps } from '@mantine/core';
import React, { forwardRef } from 'react';
import { AspectRatio } from '../../common/Layout/AspectRatio';

type OmittedAspectRatioProps = Omit<AspectRatioProps, 'ratio'>;

type Props = OmittedAspectRatioProps & {
  children: React.ReactNode;
};

export const BusinessCardAspectRatio = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <AspectRatio ratio={1254 / 758} ref={ref} {...props}>
        {children}
      </AspectRatio>
    );
  },
);

BusinessCardAspectRatio.displayName = 'BusinessCardAspectRatio';
