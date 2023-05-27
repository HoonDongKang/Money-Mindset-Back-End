import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { ExpenditureService } from './expenditure.service';
import { FlowService } from '../flow/flow.service';

@Module({
  controllers: [AssetController],
  imports: [UserModule],
  providers: [AssetService, PrismaService, ExpenditureService, FlowService],
})
export class AssetModule {}
