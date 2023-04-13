import { PartialType } from '@nestjs/swagger';
import { CreateMaginotDto } from './create-maginot.dto';

export class UpdateMaginotDto extends PartialType(CreateMaginotDto) {}
