import { Test, TestingModule } from '@nestjs/testing';
import { MaginotController } from './maginot.controller';

describe('MaginotController', () => {
  let controller: MaginotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaginotController],
    }).compile();

    controller = module.get<MaginotController>(MaginotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
