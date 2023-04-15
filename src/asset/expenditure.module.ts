import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { ExpenditureService } from './expenditure.service';

@Module({
  imports: [UserModule],
  providers: [ExpenditureService, PrismaService],
})
export class ExpenditureModule {}
