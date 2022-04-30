import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
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
