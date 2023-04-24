import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { flowCategory } from './flowCategory';

@Injectable()
export class FlowService {
  constructor(private prisma: PrismaService) {}

  getCategory() {
    return flowCategory;
  }

  // get
  // 유저 월 별 수입지출 항목

  // post
  // 유저 수입지출 create

  // put
  // flow idx로 flow update

  // delete
  // flow idx로 flow delete

  getAllFlows() {
    return this.prisma.flow.find;
  }
}
