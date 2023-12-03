'use client';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';
import { ReactNode } from 'react';
import { colors } from './colors';

export const theme = createTheme({
  primaryColor: 'blue',
  colors: colors,
  components: {
    Title: {
      defaultProps: {
        c: 'blue.6',
      },
    },
  },
});

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
