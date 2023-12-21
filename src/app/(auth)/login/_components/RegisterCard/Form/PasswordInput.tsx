import { FieldValues } from 'react-hook-form';
import { PasswordInputProps } from 'react-hook-form-mantine';
import { PasswordInput as Password } from '@/shared/components/common/Input/PasswordInput';

export const PasswordInput = <T extends FieldValues>(
  props: PasswordInputProps<T>,
) => {
  return (
    <Password
      withAsterisk
      label="パスワード"
      placeholder="パスワード"
      {...props}
    />
  );
};
