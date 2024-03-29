import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { AssetService } from './asset.service';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';

@Injectable()
export class ExpenditureService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  findAll() {
    return this.prisma.expenditure.findMany({
      include: {
        user: {
          select: {
            idx: true,
            email: true,
            nickname: true,
            asset: {
              select: {
                amount: true,
              },
            },
          },
        },
      },
    });
  }

  async findExpenditureByIdx(idx: number) {
    const expenditure = await this.prisma.expenditure.findFirst({
      where: { idx },
      include: {
        user: {
          select: {
            idx: true,
            email: true,
            nickname: true,
            asset: {
              select: {
                amount: true,
              },
            },
          },
        },
      },
    });
    if (!expenditure) {
      throw new NotFoundException(`Expenditure number ${idx} doesn't exist.`);
    }
    return expenditure;
  }

  async findByUserIdx(user_idx: number) {
    await this.userService.findOneByIdx(user_idx);
    const expenditure = await this.prisma.expenditure.findMany({
      where: { user_idx },
      include: {
        user: {
          select: {
            idx: true,
            email: true,
            nickname: true,
            asset: {
              select: {
                amount: true,
              },
            },
          },
        },
      },
    });
    return expenditure;
  }

  async createExpenditure(
    user_idx: number,
    createExpenditureDto: CreateExpenditureDto,
  ) {
    // const maginots = await this.findMiginotbyUserIdx(user_idx);
    const { expenditure_amount, fixed_expenditure, expenditure_date } =
      createExpenditureDto;
    const expenditure = await this.prisma.expenditure.create({
      data: {
        user_idx,
        expenditure_amount,
        fixed_expenditure,
        expenditure_date,
      },
    });
    return expenditure;
  }

  async updateExpenditure(
    idx: number,
    updateExpenditureDto: UpdateExpenditureDto,
  ) {
    await this.findExpenditureByIdx(idx);
    return this.prisma.expenditure.update({
      where: { idx },
      data: updateExpenditureDto,
    });
  }

  async deleteExpenditure(idx: number) {
    await this.findExpenditureByIdx(idx);
    return this.prisma.expenditure.delete({
      where: { idx },
    });
  }
}
