import { IsEmail, Length, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty()
  @IsEmail({}, { message: "Email musi mieć poprawny format" })
  @MaxLength(100, { message: "Email może mieć maksymalnie 100 znaków" })
  email: string;

  @ApiProperty()
  @Length(6, 30, { message: "Hasło musi mieć od 6 do 30 znaków" })
  password: string;
}
