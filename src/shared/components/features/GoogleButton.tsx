import { IconBrandGoogle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/shared/components/common/Button';
import { useAuth } from '@/shared/hooks/auth';

export const GoogleButton = () => {
  const router = useRouter();
  const { login } = useAuth();
  const handleClick = useCallback(async () => {
    login && (await login());
    router.push('/cards');
  }, [login, router]);

  return (
    <Button
      leftSection={<IconBrandGoogle />}
      onClick={handleClick}
      radius="xl"
      variant="light"
    >
      Continue with Google
    </Button>
  );
};
