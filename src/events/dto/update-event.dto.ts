import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDTO } from './create-event.dto';

export class UpdateEventDTO {
  @ApiProperty()
  date: string;

  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  groups: string[];

  @ApiProperty()
  description: string;

  @ApiProperty()
  room: string;
}
