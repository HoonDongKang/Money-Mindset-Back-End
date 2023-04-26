import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
    return flowCategory;
  }

  @Get('/test')
  // param : userIdx, Date
  // 해당 월의 데이터만 출력
  getTest() {
    return this.FlowService.getUserflows();
  }

  @Post('/:user_idx')
  createUserFlow(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() createFlowDto: CreateFlowDto,
  ) {
    return this.FlowService.createFlow(user_idx, createFlowDto);
  }
}
