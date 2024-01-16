'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUserPlus } from '@tabler/icons-react';
import { useCallback } from 'react';
import { MailInput } from './Form';
import { Schema, schema } from './schema';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Stack } from '@/shared/components/common/Layout/Stack';
import { useAuth } from '@/shared/hooks/auth';
import { useForm } from '@/shared/hooks/useForm';
import { useNotifications } from '@/shared/hooks/useNotifications';

export const RegisterCard = () => {
  const { handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { sendSignInLinkToEmail } = useAuth();
  const { infoNotification } = useNotifications();

  const onSubmit = useCallback(
    async (data: Schema) => {
      if (!sendSignInLinkToEmail) {
        return;
      }
      try {
        await sendSignInLinkToEmail(data.email);
        infoNotification('入力されたメールアドレスへURLを送信しました');
      } catch (error) {
        throw error;
      }
    },
    [infoNotification, sendSignInLinkToEmail],
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
            新規登録
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
