'use client';

import '@mantine/notifications/styles.css';

import { useRouter } from 'next/navigation';
import { AppProgressBar } from 'next-nprogress-bar';
import { SWRConfig } from 'swr';
import { Notifications } from '../components/common/Feedback';
import { ROUTES } from '../constants';
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
  const router = useRouter();
  return (
    <RecoilRoot>
      <AuthProvider>
        <AxiosProvider>
          <SWRConfig
            value={{
              onError: (error, key) => {
                if (error.response.status === 401) {
                  router.push(ROUTES.login.base);
                }
              },
            }}
          >
            <ThemeProvider>
              <LoadingProvider />
              <Notifications />
              {children}
              <ProgressBar />
            </ThemeProvider>
          </SWRConfig>
        </AxiosProvider>
      </AuthProvider>
    </RecoilRoot>
  );
};
