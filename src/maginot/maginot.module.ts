import { Module } from '@nestjs/common';
import { MaginotService } from './maginot.service';
import { MaginotController } from './maginot.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MaginotService, PrismaService],
  controllers: [MaginotController],
})
export class MaginotModule {}
