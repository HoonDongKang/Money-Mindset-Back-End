import { Module } from '@nestjs/common';
import { MaginotService } from './maginot.service';
import { MaginotController } from './maginot.controller';

@Module({
  providers: [MaginotService],
  controllers: [MaginotController]
})
export class MaginotModule {}
