import { bcrypt } from '~/helpers';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants';
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

export { mapCreatedUser };
