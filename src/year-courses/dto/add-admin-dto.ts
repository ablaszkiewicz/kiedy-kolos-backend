import { ApiProperty } from '@nestjs/swagger';

export class AddAdminDTO {
  @ApiProperty()
  email: string;
}
