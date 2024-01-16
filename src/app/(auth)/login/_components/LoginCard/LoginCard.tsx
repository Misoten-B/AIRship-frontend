'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUserPlus } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { MailInput } from './Form';
import { EmailLoginSchema, emailLoginSchema } from './schema';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Stack } from '@/shared/components/common/Layout/Stack';
import { ROUTES } from '@/shared/constants';
import { useAuth } from '@/shared/hooks/auth';
import { useGetUser } from '@/shared/hooks/restapi/v1/User';
import { useForm } from '@/shared/hooks/useForm';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { firebaseUserState } from '@/shared/lib/recoil';
import { useLoading } from '@/shared/providers/loading';

export const LoginCard = () => {
  const { loginWithEmail } = useAuth();

  const { handleSubmit, control } = useForm<EmailLoginSchema>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: '',
    },
  });

  const { push } = useRouter();
  const { open, close } = useLoading();
  const { errorNotification } = useNotifications();
  const firebaseUser = useRecoilValue(firebaseUserState);
  const { mutate } = useGetUser(!firebaseUser?.token);

  const onSubmit = useCallback(
    async (data: EmailLoginSchema) => {
      if (!loginWithEmail) {
        return;
      }
      open();
      try {
        await loginWithEmail();
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
        }
        errorNotification();
      } finally {
        close();
      }
    },
    [close, errorNotification, loginWithEmail, mutate, open, push],
  );

  return (
    <Container miw={400} pl="xl" pr="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="xl">
          <MailInput name="email" control={control} />
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
