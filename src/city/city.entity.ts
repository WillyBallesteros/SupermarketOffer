import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { SupermarketEntity } from '../supermarket/supermarket.entity';
import { BaseEntity } from '../shared/entities/base.entity';

@Entity()
export class CityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  numHabitants: number;

  @ManyToMany((type) => SupermarketEntity, (supermarket) => supermarket.cities)
  supermarkets: SupermarketEntity[];
}
