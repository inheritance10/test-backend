import { Column } from 'typeorm';

export class CreateUserDto {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
