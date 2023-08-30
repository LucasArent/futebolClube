import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import IUser from '../Interfaces/IUser';
import UserService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import generateToken from '../utils/generate.token';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUserByEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, data } = await this.userService.getUserByEmail(email);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { id, username, role, email: userEmail, password: userPassword } = data as IUser;

    if (!compareSync(password, userPassword)) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = generateToken({ id,
      username,
      role,
      email: userEmail,
      password: userPassword,
    });

    return res.status(mapStatusHTTP(status)).json({ token });
  };
}

export default UserController;
