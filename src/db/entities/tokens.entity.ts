import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Token {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  refresh_token: string;
}
