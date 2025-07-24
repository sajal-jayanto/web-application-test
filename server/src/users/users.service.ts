import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    if (isNaN(id)) throw new NotFoundException('Invalid User ID');
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['friends']
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
