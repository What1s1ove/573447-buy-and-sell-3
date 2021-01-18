import { HttpCode } from '~/common/enums';
import { joinMessages } from './helpers';

type Constructor = {
  status: HttpCode;
  messages: string[];
};

class HttpError extends Error {
  status: number;

  messages: string[];

  constructor({ status, messages }: Constructor) {
    super(joinMessages(messages));
    this.status = status;
    this.messages = messages;
  }
}

export default HttpError;
