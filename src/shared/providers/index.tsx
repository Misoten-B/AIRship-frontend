'use client';

import '@mantine/notifications/styles.css';

import { AppProgressBar } from 'next-nprogress-bar';
import { Notifications } from '../components/common/Feedback';
import { LoadingProvider } from './loading';
import { AuthProvider } from '@/shared/hooks/auth';
import { AxiosProvider } from '@/shared/lib/axios/AxiosProvider';
import { useMantineTheme } from '@/shared/lib/mantine';
import { ThemeProvider } from '@/shared/lib/mantine';
import { RecoilRoot } from '@/shared/lib/recoil/RecoilRoot';

const ProgressBar = () => {
  const theme = useMantineTheme();
  return (
    <AppProgressBar
      height="4px"
      color={theme.primaryColor}
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <AxiosProvider>
          <ThemeProvider>
            <LoadingProvider />
            <Notifications />
            {children}
            <ProgressBar />
          </ThemeProvider>
        </AxiosProvider>
      </AuthProvider>
    </RecoilRoot>
  );
};
