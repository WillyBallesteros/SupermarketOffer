import { Entity, Column, ManyToMany } from 'typeorm';
import { CityEntity } from '../city/city.entity';
import { BaseEntity } from '../shared/entities/base.entity';

@Entity()
export class SupermarketEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  webpage: string;

  @ManyToMany(() => CityEntity, (city) => city.supermarkets)
  cities: CityEntity[];
}
