import { Length, Max, Min } from 'class-validator';
import { User } from '@App/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateYearCourseDTO {
  @ApiProperty()
  @Length(1, 200)
  name: string;

  @ApiProperty()
  @Min(2015)
  @Max(2022)
  startYear: number;
}
