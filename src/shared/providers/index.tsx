'use client';

import { Notifications } from '@mantine/notifications';
import { AppProgressBar } from 'next-nprogress-bar';
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
            <Notifications />
            {children}
            <ProgressBar />
          </ThemeProvider>
        </AxiosProvider>
      </AuthProvider>
    </RecoilRoot>
  );
};
