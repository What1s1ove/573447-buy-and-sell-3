import { bcrypt } from '~/helpers';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants';
import { IUser } from '~/common/interfaces';
import { CreatedUser, CreatedUserPayload } from '~/common/types';

const mapCreatedUser = async (
  userRegisterPayload: CreatedUserPayload,
): Promise<CreatedUser> => {
  const password = await bcrypt.hash(
    userRegisterPayload.password,
    USER_PASSWORD_SALT_ROUNDS,
  );

  const copiedUserPayload: CreatedUserPayload = {
    ...userRegisterPayload,
    password,
  };

  delete (copiedUserPayload as Partial<CreatedUserPayload>).repeatedPassword;

  return copiedUserPayload;
};

const checkIsPasswordSame = (
  user: IUser,
  password: string,
): Promise<boolean> => {
  return bcrypt.compare(user.password, password);
};

export { mapCreatedUser, checkIsPasswordSame };
