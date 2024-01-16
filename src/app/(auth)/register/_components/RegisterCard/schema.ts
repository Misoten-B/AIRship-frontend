import { z } from 'zod';

const emailErrorMap = (
  issue: z.ZodIssueOptionalMessage,
  ctx: z.ErrorMapCtx,
) => {
  return { message: '正しいメールアドレスを入力してください' };
};

export const schema = z.object({
  email: z.string({ errorMap: emailErrorMap }).email(),
});

export type Schema = z.infer<typeof schema>;
