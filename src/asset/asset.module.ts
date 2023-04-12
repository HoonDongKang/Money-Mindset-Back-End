import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AssetController],
  imports: [UserModule],
  providers: [AssetService, PrismaService],
})
export class AssetModule {}
