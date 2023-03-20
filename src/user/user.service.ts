import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOneByIdx(idx: number) {
    const user = await this.prisma.user.findUnique({ where: { idx } });
    if (!user) {
      throw new NotFoundException(`User number ${idx} is not exist.`);
    }
    return user;
  }

  async removeUserById(idx: number) {
    try {
      await this.findOneByIdx(idx);
    } catch (e) {
      console.error(e);
    }
    return this.prisma.user.delete({ where: { idx } });
  }

  async updateUserByIdx(idx: number, updateUserDto: UpdateUserDto) {
    try {
      await this.findOneByIdx(idx);
    } catch (e) {
      console.error(e);
    }
    return this.prisma.user.update({
      where: { idx },
      data: updateUserDto,
    });
  }
}
