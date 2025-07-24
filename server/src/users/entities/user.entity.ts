import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
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

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender!: 'male' | 'female' | 'other';

  @Column()
  age!: number;

  @Column({ default: false })
  isActive!: boolean;

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends!: User[];
}
