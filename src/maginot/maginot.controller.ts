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
import { MaginotService } from './maginot.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMaginotDto } from './dto/create-maginot.dto';
import { UpdateMaginotDto } from './dto/update-maginot.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserMaginotDto } from './dto/user-maginot.dto';

@ApiTags('maginot')
@Serialize(UserMaginotDto)
@Controller('maginot')
export class MaginotController {
  constructor(private maginotService: MaginotService) {}

  @ApiOperation({ summary: `Get all Maginots` })
  @Get()
  getAllMaginots() {
    return this.maginotService.findAll();
  }

  @ApiOperation({ summary: `Get the Maginot` })
  @Get('/:idx')
  getMaginotByIdx(@Param('idx', ParseIntPipe) idx: number) {
    return this.maginotService.findByIdx(idx);
  }

  @ApiOperation({ summary: `Get User's maginot marker` })
  @Get('/marker/:user_idx')
  getMaginotMarker(@Param('user_idx', ParseIntPipe) user_idx: number) {
    return this.maginotService.chartMarker(user_idx);
  }

  //!
  @ApiOperation({ summary: `Get the user's Maginots` })
  @Get('/user/:user_idx')
  getMaginotsByUserIdx(@Param('user_idx', ParseIntPipe) user_idx: number) {
    console.log(typeof user_idx);
    return this.maginotService.findByUserIdx(user_idx);
  }

  @ApiOperation({ summary: `Create a Maginot` })
  @Post('/user/:user_idx')
  createMaginot(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() createMaginotDto: CreateMaginotDto,
  ) {
    return this.maginotService.createMaginot(user_idx, createMaginotDto);
  }

  @ApiOperation({ summary: `Update a Maginot` })
  @Patch('/:idx')
  updateMaginot(
    @Param('idx', ParseIntPipe) idx: number,
    @Body() updateMaginotDto: UpdateMaginotDto,
  ) {
    return this.maginotService.updateMaginot(idx, updateMaginotDto);
  }

  @ApiOperation({ summary: `Delete a Maginot` })
  @Delete('/:idx')
  deleteMaginot(@Param('idx', ParseIntPipe) idx: number) {
    return this.maginotService.deleteMaginot(idx);
  }
}
