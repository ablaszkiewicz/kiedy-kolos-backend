import { ApiProperty } from '@nestjs/swagger';

export class RemoveAdminDTO {
  @ApiProperty()
  email: string;
}
