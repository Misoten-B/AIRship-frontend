import { FieldValues } from 'react-hook-form';
import { TextInputProps } from 'react-hook-form-mantine';
import { TextInput } from '@/shared/components/common/Input';

export const MailInput = <T extends FieldValues>(props: TextInputProps<T>) => {
  return (
    <TextInput
      withAsterisk
      type="email"
      label="メールアドレス"
      placeholder="sample@example.com"
      {...props}
    />
  );
};
