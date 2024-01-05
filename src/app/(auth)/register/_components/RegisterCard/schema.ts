import { z } from 'zod';

const emailErrorMap = (
  issue: z.ZodIssueOptionalMessage,
  ctx: z.ErrorMapCtx,
) => {
  return { message: '正しいメールアドレスを入力してください' };
};

const passwordErrorMap = (
  issue: z.ZodIssueOptionalMessage,
  ctx: z.ErrorMapCtx,
) => {
  return { message: '8文字以上のパスワードを入力してください' };
};

const ConfirmPasswordErrorMap = (
  issue: z.ZodIssueOptionalMessage,
  ctx: z.ErrorMapCtx,
) => {
  return { message: '8文字以上のパスワードを入力してください' };
};

export const schema = z
  .object({
    email: z.string({ errorMap: emailErrorMap }).email(),
    password: z.string({ errorMap: passwordErrorMap }).min(8),
    confirmPassword: z.string({ errorMap: ConfirmPasswordErrorMap }).min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'パスワードが一致しません',
      });
    }
  });

export type Schema = z.infer<typeof schema>;
