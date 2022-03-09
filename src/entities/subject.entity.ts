import { v4 as uuid } from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { YearCourse } from './yearCourse.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column()
  yearCourseId: uuid;

  @ManyToOne(() => YearCourse, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'yearCourseId' })
  yearCourse: YearCourse;
}
