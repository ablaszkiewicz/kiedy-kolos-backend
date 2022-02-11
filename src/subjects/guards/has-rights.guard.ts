import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { SubjectsService } from '../subjects.service';

@Injectable()
export class HasRightsGuard implements CanActivate {
  constructor(private readonly subjectsService: SubjectsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!this.subjectsService.isOwner(request.user.id, request.body.id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.subjectsService.isOwner(request.user.id, request.body.id);
  }
}
