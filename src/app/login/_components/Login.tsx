'use client';
import Link from 'next/link';
import { LoginCard } from './RegisterCard/LoginCard';
import { Divider } from '@/shared/components/common/Divider';
import { Flex } from '@/shared/components/common/Layout';
import { Center } from '@/shared/components/common/Layout/Center';
import { Stack } from '@/shared/components/common/Layout/Stack';
import { Anchor } from '@/shared/components/common/Navigation';

import { Title } from '@/shared/components/common/Title';
import { LoginGoogleButton } from '@/shared/components/features';
import { AirshipMainVisual } from '@/shared/components/features/MainVisual';
import { ROUTES } from '@/shared/types/Page';

export const Login = () => {
  return (
    <Flex align="center" direction="column">
      <AirshipMainVisual maw={800} />
      <Stack gap="lg" justify="center" mt="lg">
        <Title order={3} ta="center">
          ログイン
        </Title>
        <LoginCard />
        <Divider label="または" m="lg" />

        <Center>
          <Stack gap="xl">
            <LoginGoogleButton />
            <Anchor component={Link} href={ROUTES.register}>
              アカウントをお持ちでない方はこちら
            </Anchor>
          </Stack>
        </Center>
      </Stack>
    </Flex>
  );
};
