import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public userName: string;

  @IsNotEmpty()
  @IsString()
  public email: string;
  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public gender: string;

  @IsNotEmpty()
  @IsNumber()
  public age: number;

}
