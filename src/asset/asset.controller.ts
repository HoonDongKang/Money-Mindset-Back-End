import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../user/dto/user.dto';
import { CreateAssetDto } from './dto/create-asset.dto';

@ApiTags('asset')
@Controller('asset')
export class AssetController {
  constructor(private assetSevice: AssetService) {}

  @ApiOperation({ summary: `Get all Assets` })
  @Get()
  getAllAssets() {
    return this.assetSevice.findAll();
  }

  @ApiOperation({ summary: `Create new asset on a user ` })
  @Post('/:user_idx')
  createAsset(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() body: { amount: number },
  ) {
    return this.assetSevice.createAsset(user_idx, body.amount);
  }
}
