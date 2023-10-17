import { ConfigProvider as AntdConfigProvider } from 'antd';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { StyledComponentsRegistry, theme } from '@/lib/antd';
import { AuthProvider } from '@/shared/hooks/auth/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <AntdConfigProvider theme={theme}>{children}</AntdConfigProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
