import { IsEmail, Length } from 'class-validator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'Email musi mieć poprawny format' })
  email: string;

  @Length(6, 30, { message: 'Hasło musi mieć od 6 do 30 znaków' })
  password: string;
}
