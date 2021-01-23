import { UserKey } from '~/common/enums';
import { IUser } from '~/common/interfaces';

type CreatedUser = Omit<
IUser,
UserKey.ID | UserKey.CREATED_AT | UserKey.UPDATED_AT
>;

export { CreatedUser };
