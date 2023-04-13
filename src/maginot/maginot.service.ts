import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateMaginotDto } from './dto/create-maginot.dto';

@Injectable()
export class MaginotService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  findAll() {
    return this.prisma.maginot.findMany();
  }
  async findByIdx(idx: number) {
    const maginot = await this.prisma.maginot.findFirst({
      where: { idx },
    });
    if (!maginot) {
      throw new NotFoundException(`Maginot number ${idx} doesn't exist.`);
    }
    return maginot;
  }

  async findByUserIdx(user_idx: number) {
    await this.userService.findOneByIdx(user_idx);
    const maginot = await this.prisma.maginot.findMany({
      where: { user_idx },
    });
    if (maginot.length === 0) {
      throw new NotFoundException(
        `User number ${user_idx} doesn't have an maginot.`,
      );
    }
    return maginot;
  }

  async createMaginot(user_idx: number, createMaginotDto: CreateMaginotDto) {
    // const maginots = await this.findMiginotbyUserIdx(user_idx);
    const { ranking, goal, amount } = createMaginotDto;
    const maginot = await this.prisma.maginot.create({
      data: {
        user_idx,
        ranking,
        goal,
        amount,
        line: ranking,
      },
    });
    return maginot;
  }

  async updateMaginot(
    idx: number,
    updateMaginotDto: Partial<CreateMaginotDto>,
  ) {
    if (updateMaginotDto.ranking) {
      Object.assign(updateMaginotDto, { line: updateMaginotDto.ranking });
    }
    return this.prisma.maginot.update({
      where: { idx },
      data: updateMaginotDto,
    });
  }
  async deleteMaginot(idx: number) {
    await this.findByIdx(idx);
    const maginot = this.prisma.maginot.delete({
      where: { idx },
    });
    return maginot;
  }
}
