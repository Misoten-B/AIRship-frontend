import { FieldValues } from 'react-hook-form';
import { PasswordInputProps } from 'react-hook-form-mantine';
import { PasswordInput as Password } from '@/shared/components/common/Input/PasswordInput';

export const PasswordConfirmInput = <T extends FieldValues>(
  props: PasswordInputProps<T>,
) => {
  return (
    <Password
      withAsterisk
      label="パスワード確認"
      placeholder="パスワード確認"
      {...props}
    />
  );
};
