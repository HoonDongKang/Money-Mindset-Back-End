import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

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

  async checkEmailDuplicate(email: string) {
    let isExisted = true;
    const user = await this.prisma.user.findFirst({ where: { email } });
    !user ? (isExisted = false) : (isExisted = true);
    return { isExisted };
  }

  async checkPw(idx: number, password: string) {
    const user = await this.findOneByIdx(idx);
    const isEqual = await this.authService.bcryptCompare(
      password,
      user.password,
    );
    return { isEqual };
  }

  async updateUserByIdx(idx: number, updateUserDto: UpdateUserDto) {
    try {
      await this.findOneByIdx(idx);
    } catch (e) {
      console.error(e);
    }
    if (updateUserDto.password) {
      const hashedPassword = await this.authService.bcryptHashed(
        updateUserDto.password,
      );
      Object.assign(updateUserDto, { password: hashedPassword });
    }

    return this.prisma.user.update({
      where: { idx },
      data: updateUserDto,
    });
  }
}
