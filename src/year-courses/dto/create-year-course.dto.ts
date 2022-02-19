import { Length } from 'class-validator';
import { User } from '@App/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYearCourseDTO {
  @ApiProperty()
  @Length(1, 200, { message: 'Nazwa kierunku musi mieć od 1 do 200 znaków' })
  name: string;
}
