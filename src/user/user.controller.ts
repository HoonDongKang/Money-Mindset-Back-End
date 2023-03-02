import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-users.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':idx')
  findOne(@Param('idx') idx: string) {
    return this.userService.findOne(parseInt(idx));
  }

  @Delete('/:idx')
  removeUser(@Param('idx') idx: string) {
    return this.userService.removeUser(parseInt(idx));
  }

  // @Post('/signup')
  // createUser(@Body() body: CreateUserDto) {
  //   const { email, id, nickname, password } = body;
  //   return this.userService.signup();
  // }
}
