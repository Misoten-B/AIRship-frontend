'use client';
import Link from 'next/link';
import { RegisterCard } from './RegisterCard';
import { Divider } from '@/shared/components/common/Divider';
import { Center, Flex, Stack } from '@/shared/components/common/Layout';
import { Anchor } from '@/shared/components/common/Navigation';

import { Title } from '@/shared/components/common/Title';
import { SigninGoogleButton } from '@/shared/components/features';
import { AirshipMainVisual } from '@/shared/components/features';
import { ROUTES } from '@/shared/types/Page';

export const Register = () => {
  return (
    <Flex align="center" direction="column">
      <AirshipMainVisual maw={800} />
      <Stack gap="lg" justify="center" mt="lg" pb="lg">
        <Title order={3} ta="center">
          新規登録
        </Title>
        <RegisterCard />
        <Divider label="または" m="lg" />

        <Center>
          <Stack gap="xl">
            <SigninGoogleButton />
            <Anchor component={Link} href={ROUTES.login}>
              アカウントを既にお持ちの方はこちら
            </Anchor>
          </Stack>
        </Center>
      </Stack>
    </Flex>
  );
};
