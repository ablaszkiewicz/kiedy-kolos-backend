import { v4 as uuid } from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { YearCourse } from '@App/entities/yearCourse.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: uuid;

  @Column()
  name: string;

  @Column()
  yearCourseId: uuid;

  @ManyToOne(() => YearCourse, { onDelete: 'CASCADE'})
  @JoinColumn({ name: "yearCourseId" })
  yearCourse: YearCourse;
}
