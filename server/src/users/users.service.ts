import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowUserDto } from './dto/follow-user.dto';
import { User } from './entities/user.entity';


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
    console.log(user)
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async followUser(followUserDto: FollowUserDto) {
    // first user is the login user when making friends 
    // we can get that form Auth token after implementing a auth-gard
    const currentUser = await this.userRepository.findOne({
      where: { id: 1 },
      relations: ['friends']
    }) as any


    const { userId } = followUserDto;
    const isFriendBefore = currentUser.friends.find(user => user.id === userId)
    /// can't be friend with his own 
    /// also they are all ready friend.
    if (isFriendBefore || userId === 1) {
      throw new BadRequestException('Sorry they are all ready friends.');
    }

    const friend = await this.userRepository.findOneBy({ id: userId });
    if (!friend) throw new NotFoundException('User not found');
    await this.userRepository.update(friend.id, { followerCount: friend.followerCount + 1 });

    currentUser.friends.push(friend);
    return this.userRepository.save(currentUser);;
  }
}
