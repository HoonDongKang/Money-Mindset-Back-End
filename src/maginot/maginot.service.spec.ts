import { Test, TestingModule } from '@nestjs/testing';
import { MaginotService } from './maginot.service';

describe('MaginotService', () => {
  let service: MaginotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaginotService],
    }).compile();

    service = module.get<MaginotService>(MaginotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
