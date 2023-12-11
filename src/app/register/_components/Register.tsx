'use client';
import Link from 'next/link';
import { RegisterCard } from './RegisterCard';
import { Divider } from '@/shared/components/common/Divider';
import { Flex } from '@/shared/components/common/Layout';
import { Center } from '@/shared/components/common/Layout/Center';
import { Stack } from '@/shared/components/common/Layout/Stack';
import { Anchor } from '@/shared/components/common/Navigation';

import { Title } from '@/shared/components/common/Title';
import { GoogleButton } from '@/shared/components/features/GoogleButton';
import { AirshipMainVisual } from '@/shared/components/features/MainVisual';
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
            <GoogleButton />
            <Anchor component={Link} href={ROUTES.login}>
              アカウントを既にお持ちの方はこちら
            </Anchor>
          </Stack>
        </Center>
      </Stack>
    </Flex>
  );
};
