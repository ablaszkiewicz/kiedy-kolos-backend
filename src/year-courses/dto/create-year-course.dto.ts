import { User } from 'src/entities/user.entity';

export interface CreateYearCourseDTO {
  admin: User;
  name: string;
}
