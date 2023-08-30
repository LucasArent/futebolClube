import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import UserModel from '../models/UserModel';
import { ServiceResponse } from './service.response';

class UserService {
  private userModel: IUserModel;

  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }

  getUserByEmail = async (email: string): Promise<ServiceResponse<IUser>> => {
    const getUser = await this.userModel.findByEmail(email);

    if (!getUser) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCCESSFUL', data: getUser };
  };
}

export default UserService;
