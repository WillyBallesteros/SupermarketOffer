import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
