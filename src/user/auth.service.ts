import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async emailVerify(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user) {
      throw new ConflictException(`User number ${email} is already exist.`);
    }
  }

  async signup(createUserDto: CreateUserDto) {
    const { email, id, nickname, password } = createUserDto;
    try {
      await this.emailVerify(email);
    } catch (e) {
      console.error(e);
    }
  }
}
