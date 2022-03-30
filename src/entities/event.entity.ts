import { v4 as uuid } from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { Subject } from './subject.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column()
  date: Date;

  @Column()
  subjectId: uuid;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @Column()
  yearCourseId: uuid;

  @ManyToOne(() => YearCourse, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'yearCourseId' })
  yearCourse: YearCourse;
}
