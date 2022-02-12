import { YearCourse } from 'src/entities/yearCourse.entity';

export interface CreateSubjectDTO {
  name: string;
  shortName: string;
  yearCourse: YearCourse;
}

export interface UpdateSubjectDTO {
  id: number;
  name: string;
  shortName: string;
}
