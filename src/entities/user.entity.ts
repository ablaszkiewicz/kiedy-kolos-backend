import { v4 as uuid } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: uuid;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
