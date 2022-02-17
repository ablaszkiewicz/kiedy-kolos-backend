import { Length } from "class-validator";
import { YearCourse } from "src/entities/yearCourse.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDTO {
  @ApiProperty()
  @Length(1, 150, { message: "Nazwa przedmiotów musi mieć od 1 do 150 znaków" })
  name: string;

  @ApiProperty()
  @Length(1, 4, { message: "Krótka nazwa musi mieć od 1 do 4 znaków" })
  shortName: string;

  @ApiProperty()
  yearCourse: YearCourse;
}
