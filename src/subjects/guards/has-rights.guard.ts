import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubjectsService } from '../subjects.service';

@Injectable()
export class HasRightsGuard implements CanActivate {
  constructor(private readonly subjectsService: SubjectsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.subjectsService.isOwner(request.user.id, request.body.id);
  }
}
