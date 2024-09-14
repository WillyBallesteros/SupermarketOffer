import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CityEntity } from '../city/city.entity';
import { SupermarketEntity } from '../supermarket/supermarket.entity';
import { CitySupermarketService } from './city-supermarket.service';
import { faker } from '@faker-js/faker';

describe('CitySupermarketService', () => {
  let service: CitySupermarketService;
  let cityRepository: Repository<CityEntity>;
  let supermarketRepository: Repository<SupermarketEntity>;
  let city: CityEntity;
  let supermarketsList: SupermarketEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CitySupermarketService],
    }).compile();

    service = module.get<CitySupermarketService>(CitySupermarketService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
    supermarketRepository = module.get<Repository<SupermarketEntity>>(
      getRepositoryToken(SupermarketEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    cityRepository.clear();
    supermarketRepository.clear();
    supermarketsList = [];
    for (let i = 0; i < 5; i++) {
      const supermarket: SupermarketEntity = await supermarketRepository.save({
        name: faker.company.name(),
        longitude: faker.number.int(),
        latitude: faker.number.int(),
        webpage: faker.internet.url(),
      });
      supermarketsList.push(supermarket);
    }

    city = await cityRepository.save({
      name: faker.location.city(),
      country: faker.location.country(),
      numHabitants: faker.number.int(),
      supermarkets: supermarketsList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addSupermarketToCity should add a supermarket to a city', async () => {
    const supermarket: SupermarketEntity = await supermarketRepository.save({
      name: faker.company.name(),
      longitude: faker.number.int(),
      latitude: faker.number.int(),
      webpage: faker.internet.url(),
    });

    const updatedCity = await service.addSupermarketToCity(
      city.id,
      supermarket.id,
    );
    expect(updatedCity.supermarkets.length).toEqual(
      supermarketsList.length + 1,
    );
  });

  it('findSupermarketsFromCity should return supermarkets for a city', async () => {
    const supermarkets = await service.findSupermarketsFromCity(city.id);
    expect(supermarkets.length).toEqual(supermarketsList.length);
  });

  it('findSupermarketFromCity should return a specific supermarket for a city', async () => {
    const supermarket = supermarketsList[0];
    const storedSupermarket = await service.findSupermarketFromCity(
      city.id,
      supermarket.id,
    );
    expect(storedSupermarket).not.toBeNull();
    expect(storedSupermarket.name).toEqual(supermarket.name);
  });

  it('updateSupermarketsFromCity should update supermarkets for a city', async () => {
    const newSupermarket: SupermarketEntity = await supermarketRepository.save({
      name: faker.company.name(),
      longitude: faker.number.int(),
      latitude: faker.number.int(),
      webpage: faker.internet.url(),
    });

    const updatedCity = await service.updateSupermarketsFromCity(city.id, [
      newSupermarket,
    ]);
    expect(updatedCity.supermarkets.length).toEqual(1);
    expect(updatedCity.supermarkets[0].name).toEqual(newSupermarket.name);
  });

  it('deleteSupermarketFromCity should remove a supermarket from a city', async () => {
    const supermarket = supermarketsList[0];

    await service.deleteSupermarketFromCity(city.id, supermarket.id);

    const updatedCity: CityEntity = await cityRepository.findOne({
      where: { id: city.id },
      relations: ['supermarkets'],
    });
    const removedSupermarket = updatedCity.supermarkets.find(
      (s) => s.id === supermarket.id,
    );
    expect(removedSupermarket).toBeUndefined();
  });
});
