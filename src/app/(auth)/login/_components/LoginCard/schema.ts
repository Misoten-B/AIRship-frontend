import { z } from 'zod';

const emailErrorMap = (
  issue: z.ZodIssueOptionalMessage,
  ctx: z.ErrorMapCtx,
) => {
  return { message: '正しいメールアドレスを入力してください' };
};

export const emailLoginSchema = z.object({
  email: z
    .string({
      errorMap: emailErrorMap,
    })
    .email(),
});

export type EmailLoginSchema = z.infer<typeof emailLoginSchema>;
