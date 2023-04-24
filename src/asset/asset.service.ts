import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './../user/user.service';

@Injectable()
export class AssetService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  findAll() {
    return this.prisma.asset.findMany({
      include: {
        user: {
          select: {
            email: true,
            nickname: true,
          },
        },
      },
    });
  }

  async findAssetByUserIdx(user_idx: number) {
    await this.userService.findOneByIdx(user_idx);
    const asset = await this.prisma.asset.findFirst({
      where: { user_idx },
      include: {
        user: {
          select: {
            email: true,
            nickname: true,
          },
        },
      },
    });
    if (!asset) {
      throw new NotFoundException(
        `User number ${user_idx} doesn't have an asset.`,
      );
    }
    return asset;
  }

  async createAsset(user_idx: number, amount: number) {
    const asset = await this.prisma.asset.create({
      data: {
        amount,
        user_idx,
      },
    });
    return asset;
  }

  async updateAsset(user_idx: number, amount: number) {
    await this.findAssetByUserIdx(user_idx);
    const asset = await this.prisma.asset.update({
      where: { user_idx },
      data: { amount },
    });
    return asset;
  }

  async deleteAsset(user_idx: number) {
    await this.findAssetByUserIdx(user_idx);
    const asset = await this.prisma.asset.delete({
      where: { user_idx },
    });
    return asset;
  }
}
