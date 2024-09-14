import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CityEntity } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find({ relations: ['supermarkets'] });
  }

  async findOne(id: string): Promise<CityEntity> {
    const city: CityEntity = await this.cityRepository.findOne({
      where: { id },
      relations: ['supermarkets'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return city;
  }

  async create(city: CityEntity): Promise<CityEntity> {
    return await this.cityRepository.save(city);
  }

  async update(id: string, city: CityEntity): Promise<CityEntity> {
    const cityToUpdate: CityEntity = await this.cityRepository.findOne({
      where: { id },
    });
    if (!cityToUpdate)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return await this.cityRepository.save({ ...cityToUpdate, ...city });
  }

  async delete(id: string): Promise<void> {
    const cityToDelete: CityEntity = await this.cityRepository.findOne({
      where: { id },
    });
    if (!cityToDelete)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.cityRepository.remove(cityToDelete);
  }
}