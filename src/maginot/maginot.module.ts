import { Module } from '@nestjs/common';
import { MaginotService } from './maginot.service';
import { MaginotController } from './maginot.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [MaginotService, PrismaService],
  imports: [UserModule],
  controllers: [MaginotController],
})
export class MaginotModule {}
