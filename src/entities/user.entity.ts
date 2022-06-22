import { v4 as uuid } from 'uuid';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { YearCourse } from './yearCourse.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => YearCourse, (yearCourse) => yearCourse.admins)
  yearCoursesAdminOf: YearCourse[];

  @ManyToMany(() => YearCourse, (yearCourse) => yearCourse.users)
  yearCoursesUserOf: YearCourse[];
}
