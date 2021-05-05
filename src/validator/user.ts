import { Length, IsEmail } from 'class-validator';

export class User {
  @Length(10, 20)
  title: string;

  @Length(10, 100)
  @IsEmail()
  email: string;
}

export const userSchema = {
  id: { type: 'number', required: true, example: 1 },
  name: { type: 'string', required: true, example: 'Javier' },
  email: {
    type: 'string',
    required: true,
    example: 'avileslopez.javier@gmail.com',
  },
};
