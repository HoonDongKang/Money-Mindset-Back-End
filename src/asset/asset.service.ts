import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.asset.findMany({
      include: {
        user: true,
      },
    });
  }

  async createAsset(user_idx: number, amount: number) {
    const asset = await this.prisma.asset.create({
      data: {
        amount,
        user_idx,
        // user: {
        //   connect: {
        //     idx: user_idx,
        //   },
      },
      //   },
    });
    return asset;
  }
}
