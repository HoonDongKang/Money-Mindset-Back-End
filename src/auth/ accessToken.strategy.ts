import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { Request } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest:
        //authorization에서 jwt 추출
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }
  async validate(
    req: Request,
    payload: { sub: string; exp: number; idx: number },
  ) {
    if (!this.authService.compareTokenExpiration(payload.exp)) {
      return this.userService.findOneByIdx(payload.idx);
    } else {
      throw new UnauthorizedException('Access token has been expired.');
    }
  }
}
