import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { ExpenditureService } from './expenditure.service';
import { AssetModule } from './asset.module';
import { AssetService } from './asset.service';

@Module({
  imports: [UserModule],
  providers: [ExpenditureService, PrismaService, AssetService],
})
export class ExpenditureModule {}
