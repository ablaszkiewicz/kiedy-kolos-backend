import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export const MIN_START_YEAR = new Date().getFullYear() - 5;
export const MAX_START_YEAR = new Date().getFullYear();

//1

@Entity()
export class YearCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startYear: number;

  @ManyToMany(() => User)
  @JoinTable()
  admins: User[];
}
