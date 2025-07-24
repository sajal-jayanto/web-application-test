import { Module } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { MurmursController } from './murmurs.controller';
import { Murmur } from './entities/murmur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Murmur])],
  controllers: [MurmursController],
  providers: [MurmursService],
})
export class MurmursModule { }
