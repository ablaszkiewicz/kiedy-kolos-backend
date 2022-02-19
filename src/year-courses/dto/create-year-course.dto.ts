import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYearCourseDTO {
  @ApiProperty()
  @Length(1, 200)
  name: string;
}
