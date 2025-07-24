import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FollowUserDto } from './dto/follow-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('/follow')
  followUser(@Body() followUserDto: FollowUserDto) {
    return this.usersService.followUser(followUserDto)
  }
}
