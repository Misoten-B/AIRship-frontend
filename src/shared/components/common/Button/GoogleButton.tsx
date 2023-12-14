import { IconBrandGoogle } from '../../icons/IconBrandGoogle';
import { Button } from '.';

type Props = {
  onClick?: () => void;
};

export const GoogleButton = ({ onClick }: Props) => {
  return (
    <Button
      leftSection={<IconBrandGoogle />}
      onClick={onClick}
      radius="xl"
      variant="light"
    >
      Continue with Google
    </Button>
  );
};
