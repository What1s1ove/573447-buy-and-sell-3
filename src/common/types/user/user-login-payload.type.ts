import { UserLoginPayloadKey } from '~/common/enums';

type UserLoginPayload = {
  [UserLoginPayloadKey.EMAIL]: string;
  [UserLoginPayloadKey.PASSWORD]: string;
};

export { UserLoginPayload };
