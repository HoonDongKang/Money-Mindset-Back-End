import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PrismaService } from './../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './ accessToken.strategy';
import { UserService } from 'src/user/user.service';
import { RefreshTokenStrategy } from './refreshToken.strategy';

@Module({
<<<<<<< HEAD
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
=======
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '300s',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, JwtModule],
>>>>>>> 0c3132f40daa087574d44f35b0a5bcf1c6a07004
})
export class AuthModule {}
