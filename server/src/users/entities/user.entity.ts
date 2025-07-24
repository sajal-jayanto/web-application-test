import { Murmur } from 'src/murmurs/entities/murmur.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({})
  gender!: string;

  @Column()
  age!: number;

  @Column({ default: 0 })
  followerCount!: number;

  @Column({ default: false })
  isActive!: boolean;

  @OneToMany(() => Murmur, (murmur) => murmur.author)
  murmurs!: Murmur[];

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends!: User[];
}
