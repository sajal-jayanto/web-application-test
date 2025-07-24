import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Controller('murmurs')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) { }

  @Post()
  create(@Body() createMurmurDto: CreateMurmurDto) {
    return this.murmursService.create(createMurmurDto);
  }

  @Post('/like')
  likeMurmur(@Query('murmurId') murmurId: string) {
    return this.murmursService.likeMurmur(+murmurId);
  }

  @Get('/my')
  findAllByUser(@Query('userId') userId: number, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.murmursService.findAllByUser(+userId, +page, +limit);
  }

  @Get()
  findOne(@Query('murmurId') murmurId: string) {
    return this.murmursService.findOne(+murmurId);
  }

  @Delete('')
  remove(@Query('murmurId') murmur: string,) {
    return this.murmursService.remove(+murmur);
  }
}
