import { Module } from '@nestjs/common';
import { MoneyFlowService } from './money-flow.service';
import { MoneyFlowController } from './money-flow.controller';

@Module({
  providers: [MoneyFlowService],
  controllers: [MoneyFlowController]
})
export class MoneyFlowModule {}
