import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { YearCoursesService } from '@App/year-courses/year-courses.service';
import { GroupsService } from '@App/groups/groups.service';
import { User } from '@App/entities/user.entity';
import { EventsService } from '../events.service';

@Injectable()
export class YearCourseAdminEventGuard implements CanActivate {
  constructor(private readonly eventsService: EventsService, private readonly yearCourseService: YearCoursesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const event = await this.eventsService.getById(request.params.id);
    const admins: User[] = await this.yearCourseService.findAdminsById(event.yearCourseId);

    if (admins.some((admin) => admin.id == request.user.id)) {
      return true;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
