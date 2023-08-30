import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const secret = 'figuerenseFutebolClub';

class ValidateToken {
  static validateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const token = authorization.replace('Bearer ', '');
      const payload = verify(token, secret);
      req.body.payload = payload;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default ValidateToken;
