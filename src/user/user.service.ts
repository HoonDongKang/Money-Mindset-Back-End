import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(idx: number) {
    const user = await this.prisma.user.findUnique({ where: { idx } });
    if (!user) {
      throw new NotFoundException(`User number ${idx} is not exist.`);
    }
    return user;
  }

  async removeUser(idx: number) {
    await this.findOne(idx);
    return this.prisma.user.delete({ where: { idx } });
  }
}
