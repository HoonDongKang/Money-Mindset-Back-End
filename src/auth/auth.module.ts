import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PrismaService } from './../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './ accessToken.strategy';
import { UserService } from '../user/user.service';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({}), PrismaModule],
  providers: [
    AuthService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
