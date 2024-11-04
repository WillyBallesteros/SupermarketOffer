import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../city/city.entity';
import { SupermarketEntity } from '../supermarket/supermarket.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class CitySupermarketService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(SupermarketEntity)
    private readonly supermarketRepository: Repository<SupermarketEntity>,
  ) {}

  async addSupermarketToCity(
    cityId: string,
    supermarketId: string,
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const supermarket = await this.supermarketRepository.findOne({
      where: { id: supermarketId },
    });
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    city.supermarkets.push(supermarket);
    return await this.cityRepository.save(city);
  }

  async findSupermarketsFromCity(cityId: string): Promise<SupermarketEntity[]> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return city.supermarkets;
  }

  async findSupermarketFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<SupermarketEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const supermarket = city.supermarkets.find(
      (supermarket) => supermarket.id === supermarketId,
    );
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id is not associated with the city',
        BusinessError.PRECONDITION_FAILED,
      );

    return supermarket;
  }

  async GetSupermarketsFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<SupermarketEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const supermarket = city.supermarkets.find(
      (supermarket) => supermarket.id === supermarketId,
    );
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id is not associated with the city',
        BusinessError.PRECONDITION_FAILED,
      );

    return supermarket;
  }

  async updateSupermarketsFromCity(
    cityId: string,
    supermarkets: SupermarketEntity[],
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (const supermarket of supermarkets) {
      const supermarketExist = await this.supermarketRepository.findOne({
        where: { id: supermarket.id },
      });
      if (!supermarketExist)
        throw new BusinessLogicException(
          'The supermarket with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    city.supermarkets = supermarkets;
    return await this.cityRepository.save(city);
  }

  async putSupermarketsFromCity(
    cityId: string,
    supermarkets: SupermarketEntity[],
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (const supermarket of supermarkets) {
      const supermarketExist = await this.supermarketRepository.findOne({
        where: { id: supermarket.id },
      });
      if (!supermarketExist)
        throw new BusinessLogicException(
          'The supermarket with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    city.supermarkets = supermarkets;
    return await this.cityRepository.save(city);
  }

  async deleteSupermarketFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const supermarketIndex = city.supermarkets.findIndex(
      (supermarket) => supermarket.id === supermarketId,
    );
    if (supermarketIndex === -1)
      throw new BusinessLogicException(
        'The supermarket with the given id is not associated with the city',
        BusinessError.PRECONDITION_FAILED,
      );

    city.supermarkets.splice(supermarketIndex, 1);
    return await this.cityRepository.save(city);
  }

  async removeSupermarketFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    const unusedVariable = "I am not used";
    function unusedFunction() {
        console.log("This function is not called anywhere.");
    }

    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const supermarketIndex = city.supermarkets.findIndex(
      (supermarket) => supermarket.id === supermarketId,
    );
    if (supermarketIndex === -1)
      throw new BusinessLogicException(
        'The supermarket with the given id is not associated with the city',
        BusinessError.PRECONDITION_FAILED,
      );

    city.supermarkets.splice(supermarketIndex, 1);
    return await this.cityRepository.save(city);
  }
}
