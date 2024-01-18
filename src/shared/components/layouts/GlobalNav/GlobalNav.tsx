'use client';

import { useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { ActionIcon, Button } from '../../common/Button';
import { AppShell, Group, Stack } from '../../common/Layout';
import { Burger } from '../../common/Navigation';
import { AirshipLogoRow } from '../../features/AirshipLogo';
import {
  IconCards,
  IconLogout,
  IconMoon,
  IconQrcode,
  IconSun,
} from '../../icons';
import { ROUTES } from '@/shared/constants';
import { globalState } from '@/shared/lib/recoil/atom';

type Props = {
  children: ReactNode;
};

const navigationItems = [
  { label: '名刺一覧', href: ROUTES.cards.base, icon: IconCards },
  { label: 'QR一覧', href: ROUTES.arAssets.base, icon: IconQrcode },
  { label: 'Sign out', href: ROUTES.signOut.base, icon: IconLogout },
];

export const GlobalNav = ({ children }: Props) => {
  const [globalConfig, setGlobalConfig] = useRecoilState(globalState);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [isOpen, { toggle }] = useDisclosure();
  const currentPath = usePathname();
  const dark = colorScheme === 'dark';

  const handleSwitchColorScheme = useCallback(
    (cs: 'light' | 'dark') => {
      setGlobalConfig({ ...globalConfig, dark: cs === 'dark' ? true : false });
      setColorScheme(cs);
    },
    [globalConfig, setColorScheme, setGlobalConfig],
  );

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
        <Group h="100%" px="md" justify="space-between">
          <Group h="100%" gap="md">
            <Burger
              opened={isOpen}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <AirshipLogoRow h={50} w="auto" />
          </Group>
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => handleSwitchColorScheme(dark ? 'light' : 'dark')}
            title="Toggle color scheme"
          >
            {dark ? (
              <IconSun style={{ width: 18, height: 18 }} />
            ) : (
              <IconMoon style={{ width: 18, height: 18 }} />
            )}
          </ActionIcon>
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
