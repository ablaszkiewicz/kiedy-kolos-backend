import { Length, Max, Min } from 'class-validator';
import { User } from '@App/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MAX_START_YEAR, MIN_START_YEAR } from '@App/entities/yearCourse.entity';

export class UpdateYearCourseDTO {
  @ApiProperty()
  @Length(1, 200)
  name: string;

  @ApiProperty()
  @Min(MIN_START_YEAR)
  @Max(MAX_START_YEAR)
  startYear: number;
}
