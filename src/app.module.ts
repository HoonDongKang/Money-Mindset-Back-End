import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import e from 'express';
import { JwtService } from '@nestjs/jwt';
@Module({
<<<<<<< HEAD
  imports: [PrismaModule, UserModule, AuthModule],
=======
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
>>>>>>> 0c3132f40daa087574d44f35b0a5bcf1c6a07004
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
