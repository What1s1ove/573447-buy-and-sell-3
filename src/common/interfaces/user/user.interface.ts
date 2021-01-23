import { UserKey } from '~/common/enums';

interface IUser {
  [UserKey.ID]: number;
  [UserKey.EMAIL]: string;
  [UserKey.PASSWORD]: string;
  [UserKey.FIRST_NAME]: string;
  [UserKey.LAST_NAME]: string;
  [UserKey.AVATAR]: string;
  [UserKey.CREATED_AT]: string;
  [UserKey.UPDATED_AT]: string;
}

export { IUser };
