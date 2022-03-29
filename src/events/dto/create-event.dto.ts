import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  subjectId: number;
}
