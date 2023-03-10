import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService, AuthService],
})
export class UserModule {}
