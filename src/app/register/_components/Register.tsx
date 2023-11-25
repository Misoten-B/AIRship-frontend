'use client';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { RegisterCard } from './RegisterCard';
import { Anchor } from '@/shared/components/common/Anchor';
import { Divider } from '@/shared/components/common/Divider';
import { Flex } from '@/shared/components/common/Layout';
import { Center } from '@/shared/components/common/Layout/Center';
import { Space } from '@/shared/components/common/Layout/Space';
import { Stack } from '@/shared/components/common/Layout/Stack';

import { GoogleButton } from '@/shared/components/features/GoogleButton';
import { AirshipMainVisual } from '@/shared/components/features/MainVisual';

export const Register = () => {
  return (
    <>
      <Flex align="center" direction="column">
        <AirshipMainVisual maw={800} />
        <Space h="lg" />
        <Stack gap="lg" justify="center">
          <Text size="md" fw={500} ta="center">
            新規登録
          </Text>
          <RegisterCard />
          <Divider label="または" m="lg" />

          <Center>
            <Stack gap="xl">
              <GoogleButton />
              <Anchor component={Link} href="/login">
                アカウントを既にお持ちの方はこちら
              </Anchor>
            </Stack>
          </Center>
        </Stack>
      </Flex>
    </>
  );
};
