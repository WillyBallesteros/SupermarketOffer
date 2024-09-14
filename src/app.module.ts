import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { SupermarketModule } from './supermarket/supermarket.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitySupermarketModule } from './city-supermarket/city-supermarket.module';

@Module({
  imports: [
    CityModule,
    SupermarketModule,
    CitySupermarketModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db', // Base de datos SQLite local
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sincroniza las entidades automáticamente en desarrollo
      keepConnectionAlive: true, // Mantiene la conexión activa durante las pruebas y el desarrollo
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
