import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { YearCoursesService } from '@App/year-courses/year-courses.service';

@Injectable()
export class YearCourseAdminParamsGuard implements CanActivate {
  constructor(private yearCourseService: YearCoursesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const admins = await this.yearCourseService.findAdminsById(request.params.yearCourseId);

    if (admins.some((admin) => admin.id == request.user.id)) {
      return true;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
