// src/middleware/superadmin.middleware.ts
import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SuperAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('No token provided');

    const token = authHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET!;
      const decoded = jwt.verify(token, secret) as any;

      if (decoded.role.name !== 'superadmin') {
        throw new ForbiddenException(
          'Only superadmins can access this resource',
        );
      }

      // attach user to req manually
      //   req['user'] = decoded;
      next();
    } catch (err) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
