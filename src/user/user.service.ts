import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

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
    try {
      await this.findOne(idx);
    } catch (e) {
      console.error(e);
    }
    return this.prisma.user.delete({ where: { idx } });
  }

  async updateUser(idx: number, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(idx);
    } catch (e) {
      console.error(e);
    }
    return this.prisma.user.update({
      where: { idx },
      data: updateUserDto,
    });
  }
}
