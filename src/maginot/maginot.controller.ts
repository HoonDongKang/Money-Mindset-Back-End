import { Controller } from '@nestjs/common';
import { MaginotService } from './maginot.service';

@Controller('maginot')
export class MaginotController {
  constructor(private maginotService: MaginotService) {}
}
