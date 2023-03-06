import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UserService } from './user.service';
import * as bcyrpt from 'bcrypt';

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
    const salt = await bcyrpt.genSalt(10);
    const hashedPassword = await bcyrpt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: { email, id, nickname, password: hashedPassword },
    });

    return user;
  }
  // have to check IsEmail validation
  async test(createUserDto: CreateUserDto) {
    const { email, id, nickname, password } = createUserDto;
    const user = await this.prisma.user.create({
      data: { email, id, nickname, password },
    });

    return user;
  }
}
