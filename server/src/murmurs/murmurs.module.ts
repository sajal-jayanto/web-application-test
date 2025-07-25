import { Module } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { MurmursController } from './murmurs.controller';
import { Murmur } from './entities/murmur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Murmur]), TypeOrmModule.forFeature([User])],
  controllers: [MurmursController],
  providers: [MurmursService],
})
export class MurmursModule { }
