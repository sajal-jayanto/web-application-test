import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Murmur } from './entities/murmur.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MurmursService {

  constructor(
    @InjectRepository(Murmur)
    private readonly murmurRepository: Repository<Murmur>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createMurmurDto: CreateMurmurDto) {
    // first user is the login user when create murmur 
    // we can get that form Auth token after implementing a auth-gard
    const user = await this.userRepository.findOneBy({ id: 1 });

    const { content } = createMurmurDto
    const payload = {
      content: content,
      likeCount: 0,
      author: user, // default the first user 
    }

    const createdMurmur = this.murmurRepository.create(payload);
    return await this.murmurRepository.save(createdMurmur);
  }

  findAll() {
    return this.murmurRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' }
    });
  }

  async likeMurmur(murmurId: number) {
    const murmur = await this.murmurRepository.findOneBy({ id: murmurId });
    return this.murmurRepository.update(murmurId, { likeCount: murmur.likeCount + 1 });
  }

  async findAllByUser(userId: number, page = 1, limit = 10) {
    const [data, total] = await this.murmurRepository.findAndCount({
      where: { author: { id: userId } },
      relations: ['author'],
      take: limit,
      skip: (page - 1) * limit
    });

    return {
      murmur: data,
      totalCount: total,
    };
  }


  findOne(murmurId: number) {
    return this.murmurRepository.findOne({
      where: { id: murmurId },
      relations: ['author'],
    });
  }

  async remove(murmurId: number) {
    // first user is the login user when create murmur 
    // we can get that form Auth token after implementing a auth-gard
    const user = await this.userRepository.findOneBy({ id: 1 });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const murmur = await this.murmurRepository.findOneBy({ id: murmurId });
    if (!murmur) {
      throw new NotFoundException('Murmur not found');
    }
    if (murmur.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to delete the murmur');
    }

    return this.murmurRepository.delete(murmurId);
  }
}
