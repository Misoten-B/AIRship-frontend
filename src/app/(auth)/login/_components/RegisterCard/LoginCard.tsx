'use client';
import { IconUserPlus } from '@tabler/icons-react';
import { MailInput, PasswordInput } from './Form';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Stack } from '@/shared/components/common/Layout/Stack';
import { useForm } from '@/shared/hooks/useForm';

export const LoginCard = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
