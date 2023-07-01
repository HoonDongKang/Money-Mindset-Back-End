import { PartialType } from '@nestjs/swagger';
import { FlowDetailData } from './create-flowdetail.dto';

export class UpdateFlowDetailDto extends PartialType(FlowDetailData) {}
