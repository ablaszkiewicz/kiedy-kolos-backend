import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupsService } from '@App/groups/groups.service';
import { YearCoursesService } from '@App/year-courses/year-courses.service';
import { User } from '@App/entities/user.entity';
import { Group } from '@App/entities/group.entity';

@Injectable()
export class GroupsRightsGuard implements CanActivate {
  constructor(private readonly groupsService: GroupsService,
              private readonly yearCourseService: YearCoursesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestParams = request.params;

    let yearCourseId: number | undefined = undefined;

    if(requestParams.yearCourseId) {
      yearCourseId = requestParams.yearCourseId;
    } else if(requestParams.id) {
      const group: Group = await this.groupsService.getById(requestParams.id);
      yearCourseId = group ? group.yearCourseId : undefined;
    }

    const admins: User[] = await this.yearCourseService.findAdminsById(yearCourseId);

    if(admins.some((admin) => admin.id == request.user.id)) {
      return true;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}