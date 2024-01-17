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

export const emailLoginSchema = z.object({
  email: z
    .string({
      errorMap: emailErrorMap,
    })
    .email(),
  password: z
    .string({
      errorMap: passwordErrorMap,
    })
    .min(8),
});

export type EmailLoginSchema = z.infer<typeof emailLoginSchema>;
