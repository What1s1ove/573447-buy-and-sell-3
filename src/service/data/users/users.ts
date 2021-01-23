import { UserKey } from '~/common/enums';
import { IUser } from '~/common/interfaces';
import { CreatedUser, UserModel } from '~/common/types';

type Constructor = {
  userModel: UserModel;
};

class Users {
  #User: UserModel;

  constructor({ userModel }: Constructor) {
    this.#User = userModel;
  }

  public findOne(id: IUser[UserKey.ID]): Promise<IUser | null> {
    return this.#User.findByPk(id);
  }

  public async create(createdUser: CreatedUser): Promise<IUser> {
    const user = await this.#User.create(createdUser);

    return user.get();
  }
}

export default Users;
