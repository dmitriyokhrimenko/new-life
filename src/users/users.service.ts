import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/entities/users.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(dto: createUserDto): Promise<User> {
    return await this.usersRepository.save(dto);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-types
  async update(id: number, updateData: object): Promise<User> {
    return null;
    //return this.usersRepository.update(id, updateData);
  }
}
