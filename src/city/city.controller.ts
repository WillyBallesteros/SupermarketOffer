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
import { CityDto } from './city.dto';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll(): Promise<CityEntity[]> {
    return await this.cityService.findAll();
  }

  @Get(':cityId')
  async findOne(@Param('cityId') cityId: string): Promise<CityEntity> {
    return await this.cityService.findOne(cityId);
  }

  @Post()
  async create(@Body() cityDto: CityDto): Promise<CityEntity> {
    return await this.cityService.create(plainToInstance(CityEntity, cityDto));
  }

  @Put(':cityId')
  async update(
    @Param('cityId') cityId: string,
    @Body() cityDto: CityDto,
  ): Promise<CityEntity> {
    return await this.cityService.update(
      cityId,
      plainToInstance(CityEntity, cityDto),
    );
  }

  @Delete(':cityId')
  @HttpCode(204)
  async delete(@Param('cityId') cityId: string): Promise<void> {
    await this.cityService.delete(cityId);
  }
}
