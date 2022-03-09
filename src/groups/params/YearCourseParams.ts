import { ApiProperty } from '@nestjs/swagger';

export class YearCourseParams {
  @ApiProperty()
  yearCourseId: number;
}
