import { CreatedUserPayloadKey } from '~/common/enums';

type CreatedUserPayload = {
  [CreatedUserPayloadKey.EMAIL]: string;
  [CreatedUserPayloadKey.PASSWORD]: string;
  [CreatedUserPayloadKey.REPEATED_PASSWORD]: string;
  [CreatedUserPayloadKey.FIRST_NAME]: string;
  [CreatedUserPayloadKey.LAST_NAME]: string;
  [CreatedUserPayloadKey.AVATAR]: string;
};

export { CreatedUserPayload };
