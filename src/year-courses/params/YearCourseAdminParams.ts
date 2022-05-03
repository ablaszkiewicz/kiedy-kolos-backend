import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class YearCourseAdminParams {
  @ApiProperty({ type: String, format: uuid })
  yearCourseId: uuid;

  @ApiProperty({ type: String, format: uuid })
  adminId: uuid;
}
