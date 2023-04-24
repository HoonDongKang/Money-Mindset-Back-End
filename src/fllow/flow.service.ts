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
  // /flow/user/{user_idx}
  // 유저 월 별 수입지출 항목
  // category 별 총합
  // 수입, 지출 별 총합

  // post
  // 유저 수입지출 create

  // put
  // flow idx로 flow update

  // delete
  // flow idx로 flow delete

  getAllFlows() {
    // return this.prisma.flow.find;
  }
}
