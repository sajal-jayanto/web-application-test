import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMurmurDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
