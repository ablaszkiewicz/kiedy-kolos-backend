import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @Length(1, 150)
  name: string;
}
