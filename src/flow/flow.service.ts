import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { flowCategory } from './flowCategory';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';

@Injectable()
export class FlowService {
  constructor(private prisma: PrismaService) {}

  flowIdtoName(flowArr: any) {
    for (const category of flowCategory) {
      for (const flow of flowArr) {
        if (category.id === flow.flow_id) {
          Object.assign(flow, { flowName: category.name });
        }
      }
    }
    return flowArr;
  }

  sumExpenseInSameDay(flowArr: any[]) {
    let arrLng = flowArr.length;
    for (let i = 0; i < arrLng; i++) {
      for (let j = i + 1; j < arrLng; j++) {
        if (flowArr[i].x === flowArr[j].x) {
          const dupFlow = flowArr.filter((flow) => flow.x === flowArr[i].x);
          flowArr.splice(i, dupFlow.length - 1);
          arrLng -= dupFlow.length - 1;
        }
      }
    }
  }

  flowDataToChartData(flowArr: any) {
    let expenseSum = 0;
    let chartArr = [];
    //지출일이 같으면 같은 날 합
    // for (const flow of flowArr) {
    //   const dayOfMonth = new Date(flow.flow_date).getDate();
    //   if (flow.flow_id >= 5) {
    //     expenseSum += flow.amount;
    //     const chartData = { x: dayOfMonth, y: expenseSum };
    //     chartArr = [...chartArr, chartData];
    //   }
    // }
    for (const flow of flowArr) {
      const dayOfMonth = new Date(flow.flow_date).getDate();
      expenseSum += flow.amount;
      const chartData = { x: dayOfMonth, y: expenseSum };
      chartArr = [...chartArr, chartData];
    }
    this.sumExpenseInSameDay(chartArr);
    return chartArr;
  }

  async findByIdx(idx: number) {
    const flow = await this.prisma.flow.findFirst({
      where: { idx },
    });
    if (!flow) {
      throw new NotFoundException(`Flow number ${idx} doesn't exist.`);
    }
  }

  async userFlowSum(idx: number) {
    let flowSum = 0;
    const flowArray = await this.prisma.flow.findMany({
      where: { user_idx: idx },
    });

    for (const flow of flowArray) {
      flow.flow_id <= 5 ? (flowSum += flow.amount) : (flowSum -= flow.amount);
    }
    return flowSum;
  }

  async getUserflows(user_idx: number, start_date: number, end_date: number) {
    return await this.prisma.flow.findMany({
      where: {
        user_idx,
        flow_date: { gte: new Date(start_date), lte: new Date(end_date) },
      },
      orderBy: {
        flow_date: 'asc',
      },
    });
  }
  //수입 라벨
  async getUserIncome(user_idx: number, start_date: number, end_date: number) {
    return await this.prisma.flow.findMany({
      where: {
        flow_id: {
          lte: 4,
        },
        user_idx,
        flow_date: { gte: new Date(start_date), lte: new Date(end_date) },
      },
      orderBy: {
        flow_date: 'asc',
      },
    });
  }

  //지출 라벨
  async getUserExpense(user_idx: number, start_date: number, end_date: number) {
    return await this.prisma.flow.findMany({
      where: {
        flow_id: {
          gte: 5,
        },
        user_idx,
        flow_date: { gte: new Date(start_date), lte: new Date(end_date) },
      },
      orderBy: {
        flow_date: 'asc',
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

  async updateFlow(idx: number, updateFlowDto: UpdateFlowDto) {
    await this.findByIdx(idx);
    if (updateFlowDto.flow_date) {
      updateFlowDto.flow_date = new Date(updateFlowDto.flow_date);
    }
    return this.prisma.flow.update({
      where: { idx },
      data: updateFlowDto,
    });
  }

  async deleteFlow(idx: number) {
    await this.findByIdx(idx);
    return this.prisma.flow.delete({
      where: { idx },
    });
  }

  getAllFlows() {
    // return this.prisma.flow.find;
  }
}
