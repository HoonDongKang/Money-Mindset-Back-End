import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { FlowService } from './flow.service';
import { flowCategory } from './flowCategory';
import { CreateFlowDto } from './dto/create-flow.dto';

@ApiTags('flow')
@Controller('flow')
export class FlowController {
  constructor(
    private prisma: PrismaService,
    private FlowService: FlowService,
  ) {}

  @Get()
  getCategory() {
    const arr = [
      {
        id: 1,
      },
      {
        id: 4,
      },
      {
        id: 13,
      },
    ];
    return this.FlowService.flowIdtoName(arr);
    // return flowCategory;
  }

  @Get('/:user_idx')
  // param : userIdx, Date
  // 해당 월의 데이터만 출력
  getTest(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Query('start_date', ParseIntPipe) start_date: number,
    @Query('end_date', ParseIntPipe) end_date: number,
  ) {
    //new Date('yyyy-mm-dd').getTime() => millis
    return this.FlowService.getUserflows(user_idx, start_date, end_date);
  }

  @Post('/:user_idx')
  createUserFlow(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() createFlowDto: CreateFlowDto,
  ) {
    return this.FlowService.createFlow(user_idx, createFlowDto);
  }
}
