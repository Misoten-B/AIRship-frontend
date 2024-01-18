'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUserPlus } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { MailInput, PasswordInput } from './Form';
import { EmailLoginSchema, emailLoginSchema } from './schema';
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

export const LoginCard = () => {
  const { loginWithEmailAndPassword, logout } = useAuth();

  const { handleSubmit, control } = useForm<EmailLoginSchema>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { push } = useRouter();
  const { open, close } = useLoading();
  const { errorNotification } = useNotifications();
  const { createUser } = useCreateUser();
  const firebaseUser = useRecoilValue(firebaseUserState);
  const { mutate } = useGetUser(!firebaseUser?.token);

  const onSubmit = useCallback(
    async (data: EmailLoginSchema) => {
      if (!loginWithEmailAndPassword) {
        return;
      }
      open();
      try {
        const token = await loginWithEmailAndPassword(
          data.email,
          data.password,
        );
        const currentUser = getAuth().currentUser;
        if (!currentUser) return;

        if (!currentUser.emailVerified) {
          errorNotification('登録時に入力したメールアドレスをご確認ください');
          throw true;
        }
        await createUser(token);
        const user = await mutate();
        if (user) {
          push(ROUTES.arAssets.base);
        } else {
          throw true;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.code === '401') {
            push(ROUTES.login.base);
          }
          errorNotification('メールアドレスまたはパスワードが異なります');
        }
        logout && (await logout());
        return;
      } finally {
        close();
      }
    },
    [
      close,
      createUser,
      errorNotification,
      loginWithEmailAndPassword,
      logout,
      mutate,
      open,
      push,
    ],
  );

  return (
    <Container miw={400} pl="xl" pr="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="xl">
          <MailInput name="email" control={control} />
          <PasswordInput name="password" control={control} />
          <Button
            type="submit"
            fullWidth
            radius="xl"
            leftSection={<IconUserPlus />}
          >
            ログイン
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
