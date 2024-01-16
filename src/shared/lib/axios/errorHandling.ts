import { AxiosError, isAxiosError } from 'axios';

type ErrorResponse = {
  error: string;
};

export const isApiError = (
  error: unknown,
): error is AxiosError<ErrorResponse> => {
  return isAxiosError<ErrorResponse>(error);
};
