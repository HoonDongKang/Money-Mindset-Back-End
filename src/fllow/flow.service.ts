import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { flowCategory } from './flowCategory';
import { CreateFlowDto } from './dto/create-flow.dto';

@Injectable()
export class FlowService {
  constructor(private prisma: PrismaService) {}

  getCategory() {
    return flowCategory;
  }

  async getUserflows(user_idx: number, start_date: number, end_date: number) {
    return await this.prisma.flow.findMany({
      where: {
        user_idx,
        flow_date: { gte: new Date(start_date), lte: new Date(end_date) },
      },
    });
  }

  async createFlow(user_idx: number, createFlowDto: CreateFlowDto) {
    //userIdx 검사 필요
    const { amount, flow_date, flow_id } = createFlowDto;
    const date = new Date(flow_date);
    return await this.prisma.flow.create({
      data: {
        user_idx,
        amount,
        flow_date: date,
        flow_id,
      },
    });
  }

  async updateFlow() {}

  async deleteFlow() {}

  getAllFlows() {
    // return this.prisma.flow.find;
  }
}
