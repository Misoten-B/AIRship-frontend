'use client';

import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '../../common/Button';
import { AppShell, Group, Stack } from '../../common/Layout';
import { Burger } from '../../common/Navigation';
import { AirshipLogoRow } from '../../features/AirshipLogo';
import { IconCards } from '../../icons/IconCards';
import { IconLogout } from '../../icons/IconLogout';
import { IconQrcode } from '../../icons/IconQrcode';
import { ROUTES } from '@/shared/types/Page';

type Props = {
  children: ReactNode;
};

const navigationItems = [
  { label: '名刺一覧', href: ROUTES.cards, icon: IconCards },
  { label: 'QR一覧', href: ROUTES.arAssets, icon: IconQrcode },
  { label: 'Sign out', href: ROUTES.signOut, icon: IconLogout },
];

export const GlobalNav = ({ children }: Props) => {
  const [isOpen, { toggle }] = useDisclosure();
  const currentPath = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !isOpen },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={isOpen} onClick={toggle} hiddenFrom="sm" size="sm" />
          <AirshipLogoRow h={50} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack gap="lg">
          {navigationItems.map((item) => (
            <Button
              fullWidth
              key={item.label}
              variant={currentPath === item.href ? 'filled' : 'outline'}
              component={Link}
              href={item.href}
              leftSection={<item.icon />}
              style={{ border: 'none' }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
