import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '../city/city.entity';
import { SupermarketEntity } from '../supermarket/supermarket.entity';
import { CitySupermarketController } from './city-supermarket.controller';
import { CitySupermarketService } from './city-supermarket.service';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity, SupermarketEntity])],
  providers: [CitySupermarketService],
  controllers: [CitySupermarketController],
})
export class CitySupermarketModule {}
