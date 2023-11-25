import { IconBrandGoogle } from '@tabler/icons-react';
import { useCallback } from 'react';
import { Button } from '@/shared/components/common/Button';
import { useAuth } from '@/shared/hooks/auth';

export const GoogleButton = () => {
  const { login } = useAuth();
  const handleClick = useCallback(async () => {
    login && (await login());
  }, [login]);

  return (
    <Button leftSection={<IconBrandGoogle />} onClick={handleClick}>
      Continue with Google
    </Button>
  );
};
