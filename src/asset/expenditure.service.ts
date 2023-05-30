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

  subExpenditure() {
    const startDate = 1689087600000; // 5/16
    const endDate = 1685026800000; // 7/12
    const expenditureDate = 3;
    let months = [];
    const startMonth = new Date(startDate).getMonth() + 1;
    const endMonth = new Date(endDate).getMonth() + 1;

    if (startMonth < endMonth) {
      for (let i = startMonth; i < endMonth + 1; i++) {
        months.push(i);
      }
    } else if (startMonth > endMonth) {
      for (let i = startMonth; i < 13; i++) {
        months.push(i);
      }
      for (let i = 1; i < endMonth + 1; i++) {
        months.push(i);
      }
    } else {
      months.push[startMonth];
    }
    console.log(months);
  }

  findAll() {
    this.subExpenditure();
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
