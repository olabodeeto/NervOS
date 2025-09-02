// src/middleware/superadmin.middleware.ts
import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SchoolMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('No token provided');
    const token = authHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET!;
      const decoded = jwt.verify(token, secret) as any;
      console.log('==>', decoded.role.name);
      if (decoded.role.name == 'admin' || decoded.role.name == 'staff') {
        // attach user to req manually
        req['user'] = decoded;
        next();
      } else {
        throw new ForbiddenException(
          'Only admin and staff can access this resource',
        );
      }
    } catch (err) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
