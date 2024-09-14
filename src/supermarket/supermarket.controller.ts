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
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SupermarketDto } from './supermarket.dto';
import { SupermarketEntity } from './supermarket.entity';
import { SupermarketService } from './supermarket.service';

@Controller('supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermarketController {
  constructor(private readonly supermarketService: SupermarketService) {}

  @Get()
  async findAll(): Promise<SupermarketEntity[]> {
    return await this.supermarketService.findAll();
  }

  @Get(':supermarketId')
  async findOne(
    @Param('supermarketId') supermarketId: string,
  ): Promise<SupermarketEntity> {
    return await this.supermarketService.findOne(supermarketId);
  }

  @Post()
  async create(
    @Body() supermarketDto: SupermarketDto,
  ): Promise<SupermarketEntity> {
    return await this.supermarketService.create(
      plainToInstance(SupermarketEntity, supermarketDto),
    );
  }

  @Put(':supermarketId')
  async update(
    @Param('supermarketId') supermarketId: string,
    @Body() supermarketDto: SupermarketDto,
  ): Promise<SupermarketEntity> {
    return await this.supermarketService.update(
      supermarketId,
      plainToInstance(SupermarketEntity, supermarketDto),
    );
  }

  @Delete(':supermarketId')
  @HttpCode(204)
  async delete(@Param('supermarketId') supermarketId: string): Promise<void> {
    await this.supermarketService.delete(supermarketId);
  }
}
