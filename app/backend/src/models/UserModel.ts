import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements IUserModel {
  private model: typeof SequelizeUser;

  constructor() {
    this.model = SequelizeUser;
  }

  findByEmail = async (email: string): Promise<IUser | null> =>
    this.model.findOne({
      where: { email },
    })
  ;
}

export default UserModel;
