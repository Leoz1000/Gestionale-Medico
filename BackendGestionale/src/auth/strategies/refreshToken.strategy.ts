/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

type JwtPayload = {
  sub: string;
  username: string;
  role: string;
};
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  //Fuction to validate the refresh token
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
      allowInsecureKeySizes: true,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
// @Injectable()
// export class RefreshTokenStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh',
// ) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_REFRESH_SECRET,
//       ignoreExpiration: false,
//       passReqToCallback: true,
//       allowInsecureKeySizes: true,
//     });
//   }

//   validate(req: Request, payload: any) {
//     const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
//     return { ...payload, refreshToken };
//   }
// }
