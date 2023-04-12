import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetDto } from './dto/user-asset.dto';

@ApiTags('asset')
@Serialize(AssetDto)
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
    @Body() body: CreateAssetDto,
  ) {
    return this.assetSevice.createAsset(user_idx, body.amount);
  }

  @ApiOperation({ summary: `Update user's asset ` })
  @Patch('/:user_idx')
  updateAsset(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() body: CreateAssetDto,
  ) {
    return this.assetSevice.updateAsset(user_idx, body.amount);
  }

  @ApiOperation({ summary: `Delete user's asset ` })
  @Delete('/:user_idx')
  deleteAsset(@Param('user_idx', ParseIntPipe) user_idx: number) {
    return this.assetSevice.deleteAsset(user_idx);
  }
}
