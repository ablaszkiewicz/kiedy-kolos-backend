import { Length } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateYearCourseDTO {
  admin: User;

  @Length(1, 200, { message: 'Nazwa kierunku musi mieć od 1 do 200 znaków' })
  name: string;
}
