import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { YearCoursesService } from '@App/year-courses/year-courses.service';
import { SubjectsService } from '../subjects.service';
import { GroupsService } from '@App/groups/groups.service';
import { User } from '@App/entities/user.entity';

@Injectable()
export class YearCourseAdminSubjectGuard implements CanActivate {
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly yearCourseService: YearCoursesService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const subject = await this.subjectsService.findById(request.params.id);
    const admins: User[] = await this.yearCourseService.findAdminsById(subject.yearCourseId);

    if (admins.some((admin) => admin.id == request.user.id)) {
      return true;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
