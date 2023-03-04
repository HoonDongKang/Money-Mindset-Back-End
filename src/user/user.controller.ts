import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  findAllUser() {
    return this.userService.findAll();
  }
  @Get(':idx')
  findOneUser(@Param('idx') idx: string) {
    return this.userService.findOne(parseInt(idx));
  }

  @Delete('/:idx')
  removeUser(@Param('idx') idx: string) {
    return this.userService.removeUser(parseInt(idx));
  }

  @Patch(':idx')
  updateUser(@Param('idx') idx: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(parseInt(idx), updateUserDto);
  }

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
