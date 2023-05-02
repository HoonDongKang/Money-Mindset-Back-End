import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { FlowController } from './flow.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [FlowService, PrismaService],
  controllers: [FlowController],
})
export class FlowModule {}
