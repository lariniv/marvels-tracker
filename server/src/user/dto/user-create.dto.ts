import { IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  readonly name: string;
}
