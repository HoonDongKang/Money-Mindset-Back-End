import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService, AuthService],
})
export class AppModule {}
