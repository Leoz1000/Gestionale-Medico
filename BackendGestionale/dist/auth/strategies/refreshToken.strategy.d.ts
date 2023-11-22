import { Strategy } from 'passport-jwt';
type JwtPayload = {
    sub: string;
    username: string;
    role: string;
};
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(payload: JwtPayload): JwtPayload;
}
export {};
