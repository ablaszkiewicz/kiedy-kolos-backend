import { ApiProperty } from '@nestjs/swagger';

export class YearCourseWithSubjectParams {
  @ApiProperty()
  yearCourseId: number;

  @ApiProperty()
  subjectId: number;
}
