'use client';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { createTheme } from '@mantine/core';
import { ReactNode, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { globalState } from '../recoil/atom';
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

export const darkTheme = createTheme({
  primaryColor: 'blue',
  colors: colors,
  components: {
    Title: {
      defaultProps: {
        c: 'blue.2',
      },
    },
  },
});

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const globalConfig = useRecoilValue(globalState);
  const [colorScheme, setColorScheme] = useState<'dark' | 'light' | null>(null);

  useEffect(() => {
    setColorScheme(globalConfig.dark ? 'dark' : 'light');
  }, [globalConfig.dark]);

  if (colorScheme == null) {
    return <></>;
  }

  return (
    <MantineProvider theme={colorScheme === 'light' ? theme : darkTheme}>
      {children}
    </MantineProvider>
  );
};
