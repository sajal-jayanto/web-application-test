import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Controller('murmurs')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) { }

  @Post()
  create(@Body() createMurmurDto: CreateMurmurDto) {
    return this.murmursService.create(createMurmurDto);
  }

  @Post('/like/:id')
  likeMurmur(@Param('id') id: string) {
    return this.murmursService.likeMurmur(+id);
  }

  @Get()
  findAll() {
    return this.murmursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.murmursService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.murmursService.remove(+id);
  }
}
