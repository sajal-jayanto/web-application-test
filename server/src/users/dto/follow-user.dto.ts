import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FollowUserDto {
  @IsNotEmpty()
  @IsNumber()
  public userId: number;
}
