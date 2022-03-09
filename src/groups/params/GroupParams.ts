import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class GroupParams {
  @ApiProperty({ type: String, format: uuid }) // todo: show uuid properly
  id: uuid;
}
