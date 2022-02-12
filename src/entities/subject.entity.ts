import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { YearCourse } from './yearCourse.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @ManyToOne(() => YearCourse)
  @JoinColumn()
  yearCourse: YearCourse;
}
