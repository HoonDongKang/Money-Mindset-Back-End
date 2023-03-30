import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken_google: any,
    refreshToken_google: any,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { displayName, emails } = profile;
    let refreshToken: string, accessToken: string;
    const user = {
      email: emails[0].value,
      nickname: displayName,
    };
    const isDuplicate = await this.userService.checkEmailDuplicate(user.email);
    if (!isDuplicate) {
      ({ accessToken, refreshToken } = await this.authService.signup({
        email: user.email,
        nickname: user.nickname,
      }));
    } else {
      ({ accessToken, refreshToken } = await this.authService.signin({
        email: user.email,
      }));
    }
    const info = { refreshToken, accessToken, ...user };
    done(null, info);
  }
}
