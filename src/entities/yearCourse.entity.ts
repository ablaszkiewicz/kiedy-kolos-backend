import { v4 as uuid } from 'uuid';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

//export const MIN_START_YEAR = new Date().getFullYear() - 5;
export const MIN_START_YEAR = 1;
export const MAX_START_YEAR = 2050;

@Entity()
export class YearCourse {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column()
  name: string;

  @Column()
  startYear: number;

  @ManyToMany(() => User, (user) => user.yearCoursesAdminOf, { cascade: true })
  @JoinTable()
  admins: User[];

  @ManyToMany(() => User, (user) => user.yearCoursesUserOf, { cascade: true })
  @JoinTable()
  users: User[];
}
