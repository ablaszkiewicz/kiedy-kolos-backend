import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class YearCourseUserParams {
  @ApiProperty({ type: String, format: uuid })
  yearCourseId: uuid;

  @ApiProperty({ type: String, format: uuid })
  userId: uuid;
}
