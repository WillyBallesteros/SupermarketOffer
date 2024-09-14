import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketController } from './supermarket.controller';
import { SupermarketService } from './supermarket.service';
import { SupermarketEntity } from './supermarket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupermarketEntity])],
  providers: [SupermarketService],
  controllers: [SupermarketController],
})
export class SupermarketModule {}
