import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDTO {
  @ApiProperty()
  @Length(1, 150)
  name: string;

  @ApiProperty()
  @Length(1, 4)
  shortName: string;
}
