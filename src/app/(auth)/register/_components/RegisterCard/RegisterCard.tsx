'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUserPlus } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { MailInput, PasswordConfirmInput, PasswordInput } from './Form';
import { Schema, schema } from './schema';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Stack } from '@/shared/components/common/Layout/Stack';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';
import { useForm } from '@/shared/hooks/useForm';
import { useNotifications } from '@/shared/hooks/useNotifications';
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

  const onSubmit = useCallback(
    async (data: Schema) => {
      if (!createUserWithEmailAndPassword) {
        return;
      }
      open();
      try {
        const d = await createUserWithEmailAndPassword(
          data.email,
          data.password,
        );
        if (d) {
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
