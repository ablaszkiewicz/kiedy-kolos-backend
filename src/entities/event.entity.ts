import { v4 as uuid } from 'uuid';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { YearCourse } from '@App/entities/yearCourse.entity';
import { Subject } from './subject.entity';
import { Group } from './group.entity';
import { EventStatus, Status } from './event-status.entity';

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

  @ManyToMany(() => Group, { cascade: true })
  @JoinTable()
  groups: Group[];

  @Column()
  description: string;

  @Column()
  room: string;

  @OneToMany(() => EventStatus, (status) => status.event)
  statuses: EventStatus[];
}

export interface EventWithStatus extends Event {
  status: Status;
}
