import { HttpCode } from '~/common/enums';

type Constructor = {
  status: HttpCode;
  message: string;
};

class HttpError extends Error {
  status: number;

  message: string;

  constructor({ status, message }: Constructor) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpError;
