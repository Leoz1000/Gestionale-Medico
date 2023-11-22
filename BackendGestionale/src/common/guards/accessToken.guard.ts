/* eslint-disable prettier/prettier */
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    const token = context.switchToHttp().getRequest().headers.authorization;

    if (!token) {
      throw new UnauthorizedException();
    }
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
