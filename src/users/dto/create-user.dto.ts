import { IsEmail, Length, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'Email musi mieć poprawny format' })
  @MaxLength(100, { message: 'Email może mieć maksymalnie 100 znaków' })
  email: string;

  @Length(6, 30, { message: 'Hasło musi mieć od 6 do 30 znaków' })
  password: string;
}
