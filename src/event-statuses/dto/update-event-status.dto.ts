import { Status } from '@App/entities/event-status.entity';
import { PartialType } from '@nestjs/swagger';

export class UpdateEventStatusDto {
  userId: string;
  eventId: string;
  status: Status;
}
