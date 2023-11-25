import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Button } from '../../common/Button';
import { AppShell, Burger, Group, Stack } from '../../common/Layout';
import { AirshipLogo, AirshipTitle } from '../../features/AirshipLogo';
import { IconCards } from '../../icons/IconCards';
import { IconLogout } from '../../icons/IconLogout';
import { IconQrcode } from '../../icons/IconQrcode';

type Props = {
  children: ReactNode;
};

const nacigationItems = [
  { label: '名刺一覧', href: '', icon: IconCards },
  { label: 'QR一覧', href: '', icon: IconQrcode },
  { label: 'Sign out', href: '', icon: IconLogout },
];

export const GlobalNav = ({ children }: Props) => {
  const [isOpen, { toggle }] = useDisclosure();
  const router = useRouter();
  const currentPath = router.pathname;

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
          <AirshipLogo h={50} />
          <AirshipTitle h={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack gap="lg">
          {nacigationItems.map((item) => (
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
