import { HttpError } from '~/common/exceptions';

const getHttpErrors = (err: HttpError | unknown): string[] => {
  return err instanceof HttpError ? err.messages : [];
};

export { getHttpErrors };
