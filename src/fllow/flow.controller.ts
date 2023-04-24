import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { FlowService } from './flow.service';
import { flowCategory } from './flowCategory';

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
}
