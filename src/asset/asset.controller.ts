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
import { ExpenditureService } from './expenditure.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';

@ApiTags('asset')
@Serialize(AssetDto)
@Controller('asset')
export class AssetController {
  constructor(
    private assetSevice: AssetService,
    private expenditureService: ExpenditureService,
  ) {}

  // Asset
  @ApiOperation({ summary: `Get all Assets` })
  @Get()
  getAllAssets() {
    return this.assetSevice.findAll();
  }

  @ApiOperation({ summary: `Get user's Asset` })
  @Get('/user/:user_idx')
  async getUserAsset(@Param('user_idx', ParseIntPipe) user_idx: number) {
    let expenditureAmount = 0;
    const userAsset = await this.assetSevice.findAssetByUserIdx(user_idx);
    const fixedExpenditures = await this.expenditureService.findByUserIdx(
      user_idx,
    );
    //amount of fixed expenditure
    for (const expenditure of fixedExpenditures) {
      expenditureAmount += expenditure.expenditure_amount;
    }

    return Object.assign(userAsset, {
      fixedExpenditureAmount: expenditureAmount,
    });
  }

  @ApiOperation({ summary: `Create new asset on a user ` })
  @Post('/user/:user_idx')
  createAsset(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() body: CreateAssetDto,
  ) {
    return this.assetSevice.createAsset(user_idx, body.amount);
  }

  @ApiOperation({ summary: `Update user's asset ` })
  @Patch('/user/:user_idx')
  updateAsset(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() body: CreateAssetDto,
  ) {
    return this.assetSevice.updateAsset(user_idx, body.amount);
  }

  @ApiOperation({ summary: `Delete user's asset ` })
  @Delete('/user/:user_idx')
  deleteAsset(@Param('user_idx', ParseIntPipe) user_idx: number) {
    return this.assetSevice.deleteAsset(user_idx);
  }

  //Fixed Expenditure

  @ApiOperation({ summary: `Get all Expenditures` })
  @Get('/expenditure')
  getAllExpenditure() {
    return this.expenditureService.findAll();
  }

  @ApiOperation({ summary: `Get Expenditure by idx` })
  @Get('/expenditure/:idx')
  getExpenditureByIdx(@Param('idx', ParseIntPipe) idx: number) {
    return this.expenditureService.findExpenditureByIdx(idx);
  }

  @ApiOperation({ summary: `Get Expenditure by user_idx` })
  @Get('/user/:user_idx/expenditure')
  getExpenditureByUserIdx(@Param('user_idx', ParseIntPipe) user_idx: number) {
    return this.expenditureService.findByUserIdx(user_idx);
  }

  @ApiOperation({ summary: `Create Expenditure` })
  @Post('/user/:user_idx/expenditure')
  createExpenditure(
    @Param('user_idx', ParseIntPipe) user_idx: number,
    @Body() createExpenditureDto: CreateExpenditureDto,
  ) {
    return this.expenditureService.createExpenditure(
      user_idx,
      createExpenditureDto,
    );
  }

  @ApiOperation({ summary: `Update Expenditure` })
  @Patch('/expenditure/:idx')
  updateExpenditure(
    @Param('idx', ParseIntPipe) idx: number,
    @Body() updateExpenditureDto: UpdateExpenditureDto,
  ) {
    return this.expenditureService.updateExpenditure(idx, updateExpenditureDto);
  }

  @ApiOperation({ summary: `Delete Expenditure` })
  @Delete('/expenditure/:idx')
  deleteExpenditure(@Param('idx', ParseIntPipe) idx: number) {
    return this.expenditureService.deleteExpenditure(idx);
  }
}
