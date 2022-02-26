import { Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYearCourseDTO {
  @ApiProperty()
  @Length(1, 200)
  name: string;

  @ApiProperty()
  @Min(2015)
  @Max(2022)
  startYear: number;
}
