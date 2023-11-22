import { ExecutionContext } from '@nestjs/common';
declare const AccessTokenGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AccessTokenGuard extends AccessTokenGuard_base {
    canActivate(context: ExecutionContext): any;
    handleRequest(err: any, user: any): any;
}
export {};
