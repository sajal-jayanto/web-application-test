import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender!: 'male' | 'female' | 'other';

  @Column()
  age!: number;

  @Column({ default: false })
  isActive!: boolean;
}
