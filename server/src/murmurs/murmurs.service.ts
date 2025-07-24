import { Injectable } from '@nestjs/common';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Murmur } from './entities/murmur.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MurmursService {

  constructor(
    @InjectRepository(Murmur)
    private readonly murmurRepository: Repository<Murmur>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createMurmurDto: CreateMurmurDto) {
    // first user is the default user when create murmur 
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

  async likeMurmur(id: number) {
    const murmur = await this.murmurRepository.findOneBy({ id });
    return this.murmurRepository.update(id, { likeCount: murmur.likeCount + 1 });
  }

  findAll() {
    return this.murmurRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} murmur`;
  }

  remove(id: number) {
    return `This action removes a #${id} murmur`;
  }
}
