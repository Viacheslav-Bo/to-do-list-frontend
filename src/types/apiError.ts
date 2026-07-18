import { AxiosError } from "axios";

export type BackendErrorBody = {
  message?: string;
  errors?: { field: string; message: string }[];
};

export type ApiError = AxiosError<BackendErrorBody>;

export function getErrorMessage(error: unknown, fallback: string): string {
  const err = error as ApiError;

  const zodMessage = err.response?.data?.errors?.[0]?.message;
  if (zodMessage) return zodMessage;

  const message = err.response?.data?.message;
  if (message) return message;

  return fallback;
}
