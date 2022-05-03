import { v4 as uuid } from 'uuid';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupsService } from '@App/groups/groups.service';
import { YearCoursesService } from '@App/year-courses/year-courses.service';
import { User } from '@App/entities/user.entity';
import { Group } from '@App/entities/group.entity';

@Injectable()
export class YearCourseAdminGroupGuard implements CanActivate {
  constructor(private readonly groupsService: GroupsService, private readonly yearCourseService: YearCoursesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const group = await this.groupsService.getById(request.params.id);
    const admins: User[] = await this.yearCourseService.findAdminsById(group.yearCourseId);

    if (admins.some((admin) => admin.id == request.user.id)) {
      return true;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
