import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { YearCoursesService } from 'src/year-courses/year-courses.service';
import { SubjectsService } from '../subjects.service';

@Injectable()
export class HasRightsGuard implements CanActivate {
  constructor(private readonly subjectsService: SubjectsService, private yearCourseService: YearCoursesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const admins = await this.yearCourseService.getAdminsById(request.params.yearCourseId);
    if (admins.some((admin) => admin.id == request.user.id)) {
      return true;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
