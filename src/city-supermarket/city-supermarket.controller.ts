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
    private readonly unusedService: any,  // Parámetro innecesario en el constructor
  ) { }

  @Post(':supermarketId')
  async addSupermarketToCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    // Lógica de negocio para agregar un supermercado a la ciudad
    return await this.citySupermarketService.addSupermarketToCity(
      cityId,
      supermarketId,
    );
  }

  @Get()
  async findSupermarketsFromCity(
    @Param('cityId') cityId: string,
  ): Promise<any> {  // Uso de 'any' en el tipo de retorno
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
    return this.citySupermarketService.updateSupermarketsFromCity(  // Quitar await innecesario
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
    ); // Uso innecesario de await
  }
}
