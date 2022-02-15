import { Length } from 'class-validator';
import { YearCourse } from 'src/entities/yearCourse.entity';

export class CreateSubjectDTO {
  @Length(1, 150, { message: 'Nazwa przedmiotów musi mieć od 1 do 150 znaków' })
  name: string;

  @Length(1, 4, { message: 'Krótka nazwa musi mieć od 1 do 4 znaków' })
  shortName: string;
  yearCourse: YearCourse;
}
