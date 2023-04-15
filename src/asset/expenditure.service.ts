import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';

@Injectable()
export class ExpenditureService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  findAll() {
    return this.prisma.expenditure.findMany({
      include: {
        asset: {
          select: {
            amount: true,
          },
        },
        user: {
          select: {
            idx: true,
            email: true,
            nickname: true,
          },
        },
      },
    });
  }

  async findExpenditureByIdx(idx: number) {
    const expenditure = await this.prisma.expenditure.findFirst({
      where: { idx },
      include: {
        asset: {
          select: {
            amount: true,
          },
        },
        user: {
          select: {
            idx: true,
            email: true,
            nickname: true,
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
        asset: {
          select: {
            amount: true,
          },
        },
        user: {
          select: {
            idx: true,
            email: true,
            nickname: true,
          },
        },
      },
    });
    if (expenditure.length === 0) {
      throw new NotFoundException(
        `User number ${user_idx} doesn't have a fixed expenditure.`,
      );
    }
    return expenditure;
  }

  async createExpenditure(
    user_idx: number,
    asset_idx: number,
    createExpenditureDto: CreateExpenditureDto,
  ) {
    // const maginots = await this.findMiginotbyUserIdx(user_idx);
    const { expenditure_amount, fixed_expenditure } = createExpenditureDto;
    const expenditure = await this.prisma.expenditure.create({
      data: {
        user_idx,
        asset_idx,
        expenditure_amount,
        fixed_expenditure,
      },
    });
    return expenditure;
  }

  // async updateExpenditure(
  //   user_idx: number,
  //   asset_idx: number,
  //   createExpenditureDto: CreateExpenditureDto,
  // ) {
  //   // const maginots = await this.findMiginotbyUserIdx(user_idx);
  //   const { expenditure_amount, fixed_expenditure } = createExpenditureDto;
  //   const expenditure = await this.prisma.expenditure.create({
  //     data: {
  //       user_idx,
  //       asset_idx,
  //       expenditure_amount,
  //       fixed_expenditure,
  //     },
  //   });
  //   return expenditure;
  // }
}
