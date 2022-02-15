import { YearCourse } from 'src/entities/yearCourse.entity';

export interface CreateSubjectDTO {
  name: string;
  shortName: string;
  yearCourse: YearCourse;
}
