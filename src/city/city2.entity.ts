import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { SupermarketEntity } from '../supermarket/supermarket.entity';
import { BaseEntity } from '../shared/entities/base.entity';

@Entity()
export class CityEntity2 extends BaseEntity {
  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  numHabitants: number;

  @ManyToMany(() => SupermarketEntity, (supermarket) => supermarket.cities)
  @JoinTable()
  supermarkets: SupermarketEntity[];
}