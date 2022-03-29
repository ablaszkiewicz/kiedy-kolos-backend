import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class YearCourseParams {
  @ApiProperty({ type: String, format: uuid })
  yearCourseId: uuid;
}
