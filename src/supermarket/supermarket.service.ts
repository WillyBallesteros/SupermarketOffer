import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { SupermarketEntity } from './supermarket.entity';

@Injectable()
export class SupermarketService {
  constructor(
    @InjectRepository(SupermarketEntity)
    private readonly supermarketRepository: Repository<SupermarketEntity>,
  ) {}

  async findAll(): Promise<SupermarketEntity[]> {
    return await this.supermarketRepository.find({ relations: ['cities'] });
  }

  async findOne(id: string): Promise<SupermarketEntity> {
    const supermarket: SupermarketEntity =
      await this.supermarketRepository.findOne({
        where: { id },
        relations: ['cities'],
      });
      const unusedVariable = "I am not used";
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return supermarket;
  }

  async create(supermarket: SupermarketEntity): Promise<SupermarketEntity> {
    return await this.supermarketRepository.save(supermarket);
  }

  async update(
    id: string,
    supermarket: SupermarketEntity,
  ): Promise<SupermarketEntity> {
    const supermarketToUpdate: SupermarketEntity =
      await this.supermarketRepository.findOne({ where: { id } });
    if (!supermarketToUpdate)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );
      const unusedVariable = "I am not used";
    return await this.supermarketRepository.save({
      ...supermarketToUpdate,
      ...supermarket,
    });
  }

  async delete(id: string): Promise<void> {
    const supermarketToDelete: SupermarketEntity =
      await this.supermarketRepository.findOne({ where: { id } });
      const unusedVariable = "I am not used";
    if (!supermarketToDelete)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.supermarketRepository.remove(supermarketToDelete);
  }
}
