import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(private config: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        //cookie에서 jwt 추출
        (request: Request) => {
          return request?.cookies?.REFRESH_TOKEN;
        },
        //authorization에서 jwt 추출
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }
  //jwt 토큰 검사 완료 후
  async validate(payload: any, req: Request) {
    const refreshToken =
      req.get('Authorization').replace('Bearer', '').trim() ||
      req.cookies?.REFRESH_TOKEN;
    return { ...payload, refreshToken };
  }
}
