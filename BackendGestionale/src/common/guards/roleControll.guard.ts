/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }
  canActivate(contex: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', contex.getHandler());
    if (!roles) {
      return true;
    }
    const request = contex.switchToHttp().getRequest();
    const role = request.headers.role;

    if (!role) {
      return false;
    }
    return this.matchRoles(roles, role);
  }
}
