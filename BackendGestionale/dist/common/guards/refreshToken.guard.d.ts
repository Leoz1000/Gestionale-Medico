import { ExecutionContext } from '@nestjs/common';
declare const RefreshTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RefreshTokenGuard extends RefreshTokenGuard_base {
    canActivate(context: ExecutionContext): any;
    handleRequest(err: any, user: any, info: any): any;
}
export {};
