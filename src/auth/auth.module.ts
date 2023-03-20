import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { AuthService } from './auth.service';
import { PrismaService } from './../prisma/prisma.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
