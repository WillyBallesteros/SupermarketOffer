import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CitySupermarketService } from './city-supermarket.service';
import { SupermarketEntity } from '../supermarket/supermarket.entity';

@Controller('cities/:cityId/supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class CitySupermarketController {
  constructor(
    private readonly citySupermarketService: CitySupermarketService,
  ) {}

  @Post(':supermarketId')
  async addSupermarketToCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return await this.citySupermarketService.addSupermarketToCity(
      cityId,
      supermarketId,
    );
  }

  @Get()
  async findSupermarketsFromCity(
    @Param('cityId') cityId: string,
  ): Promise<SupermarketEntity[]> {
    return await this.citySupermarketService.findSupermarketsFromCity(cityId);
  }

  @Get(':supermarketId')
  async findSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ): Promise<SupermarketEntity> {
    return await this.citySupermarketService.findSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }

  @Put()
  async updateSupermarketsFromCity(
    @Param('cityId') cityId: string,
    @Body() supermarkets: SupermarketEntity[],
  ) {
    return await this.citySupermarketService.updateSupermarketsFromCity(
      cityId,
      supermarkets,
    );
  }

  @Delete(':supermarketId')
  @HttpCode(204)
  async deleteSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return await this.citySupermarketService.deleteSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }
}
