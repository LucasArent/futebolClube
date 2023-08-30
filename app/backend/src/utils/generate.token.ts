import { SignOptions, sign } from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';

const config: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const secret = 'figuerenseFutebolClub';

export default function generateToken(user: IUser): string {
  const token = sign(user, secret, config);
  return token;
}
