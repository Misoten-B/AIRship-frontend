'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUserPlus } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { MailInput, PasswordConfirmInput, PasswordInput } from './Form';
import { Schema, schema } from './schema';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Stack } from '@/shared/components/common/Layout/Stack';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';
import { useCreateUser, useGetUser } from '@/shared/hooks/restapi/v1/User';
import { useForm } from '@/shared/hooks/useForm';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { firebaseUserState } from '@/shared/lib/recoil';
import { useLoading } from '@/shared/providers/loading';

export const RegisterCard = () => {
  const { handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { createUserWithEmailAndPassword } = useAuth();
  const { open, close } = useLoading();
  const { push } = useRouter();
  const { errorNotification } = useNotifications();
  const firebaseUser = useRecoilValue(firebaseUserState);
  const { data, mutate, error } = useGetUser(!firebaseUser?.token);
  const { createUser } = useCreateUser();

  const onSubmit = useCallback(
    async (data: Schema) => {
      if (!createUserWithEmailAndPassword) {
        return;
      }
      open();
      try {
        const token = await createUserWithEmailAndPassword(
          data.email,
          data.password,
        );
        await createUser(token);
        if (token) {
          push(ROUTES.arAssets.base);
        } else {
          throw true;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.code === '401') {
            push(ROUTES.login.base);
          }
        }
        errorNotification();
      } finally {
        close();
      }
    },
    [close, createUserWithEmailAndPassword, errorNotification, open, push],
  );

  return (
    <Container miw={400} pl="xl" pr="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="xl">
          <MailInput name="email" control={control} />
          <PasswordInput name="password" control={control} />
          <PasswordConfirmInput name="confirmPassword" control={control} />
          <Button
            type="submit"
            fullWidth
            radius="xl"
            leftSection={<IconUserPlus />}
          >
            新規登録
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
