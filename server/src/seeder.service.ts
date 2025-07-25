import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Murmur } from './murmurs/entities/murmur.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Murmur)
    private readonly murmurRepository: Repository<Murmur>,
  ) { }

  async onApplicationBootstrap() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      const users = await this.userRepository.save(userData);
      console.log('Users seeded');

      const murmurs = getMurmurs(users);
      await this.murmurRepository.save(murmurs);
      console.log('Murmurs seeded');
    }
  }
}

const userData = [
  {
    id: 1,
    email: 'alice.chen@example.com',
    isAdmin: 1,
    userName: 'AliceChen',
    password: 'test@1234',
    age: 18,
    gender: 'female',
  },
  {
    id: 2,
    email: 'brian.johnson@example.com',
    isAdmin: 0,
    userName: 'BrianJ',
    password: 'test@1234',
    age: 18,
    gender: 'male',
  },
  {
    id: 3,
    email: 'carla.mendez@example.com',
    isAdmin: 0,
    userName: 'CarlaM',
    password: 'test@1234',
    age: 18,
    gender: 'female',
  },
  {
    id: 4,
    email: 'david.smith@example.com',
    isAdmin: 0,
    userName: 'DaveSmith',
    password: 'test@1234',
    age: 18,
    gender: 'male',
  },
  {
    id: 5,
    email: 'emma.taylor@example.com',
    isAdmin: 0,
    userName: 'EmmaT',
    password: 'test@1234',
    age: 18,
    gender: 'female',
  },
  {
    id: 6,
    email: 'frank.wilson@example.com',
    isAdmin: 0,
    userName: 'FrankW',
    password: 'test@1234',
    age: 18,
    gender: 'male',
  },
]

const getMurmurs = (users) => {
  let murmurs = []
  for (let user of users) {
    murmurs.push({ content: textContent, likeCount: 0, author: user })
    murmurs.push({ content: textContent, likeCount: 0, author: user })
    murmurs.push({ content: textContent, likeCount: 0, author: user })
  }
  return murmurs;
}

const textContent = `There are two sample tables in this application. Please consider and add columns to below tables. Further more I think you need more tables, so it's possible to add new tables depending on below specification.There are two sample tables in this application. Please consider and add columns to below tables. Further more I think you need more tables, so it's possible to add new tables depending on below specification.There are two sample tables in this application. Please consider and add columns to below tables. Further more I think you need more tables, so it's possible to add new tables depending on below specification.`