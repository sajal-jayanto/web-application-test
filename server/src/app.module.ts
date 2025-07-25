import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MurmursModule } from './murmurs/murmurs.module';
import { User } from './users/entities/user.entity';
import { Murmur } from './murmurs/entities/murmur.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'murmur_task',
      entities: [User, Murmur],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Murmur]),
    UsersModule,
    MurmursModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule { }
