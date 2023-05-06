import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { FlowService } from './flow.service';
import { flowCategory } from './flowCategory';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';

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

  @Get('user/:user_idx')
  // param : userIdx, Date
  // 해당 월의 데이터만 출력
  async getUserFlows(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Query('start_date', ParseIntPipe) start_date: number,
    @Query('end_date', ParseIntPipe) end_date: number,
  ) {
    //new Date('yyyy-mm-dd').getTime() => millis
    const userFlows = await this.FlowService.getUserflows(
      user_idx,
      start_date,
      end_date,
    );
    return this.FlowService.flowIdtoName(userFlows);
  }

  @Post('user/:user_idx')
  createUserFlow(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() createFlowDto: CreateFlowDto,
  ) {
    return this.FlowService.createFlow(user_idx, createFlowDto);
  }

  @Patch('/:idx')
  updateUserFlow(
    @Param('idx', ParseIntPipe) idx: number,
    @Body() updateFlowDto: UpdateFlowDto,
  ) {
    return this.FlowService.updateFlow(idx, updateFlowDto);
  }

  @Delete('/:idx')
  deleteUserFlow(@Param('idx', ParseIntPipe) idx: number) {
    return this.FlowService.deleteFlow(idx);
  }
}
