import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserCreateDto } from './dto/user-create.dto.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserCreateDto) {
    const user = await this.prisma.user.create({
      data: {
        email: '',
        password: '',
        ...data,
      },
    });

    if (!user) throw new Error('Could not create a user');

    return user;
  }

  async getAll() {
    const users = await this.prisma.user.findMany();

    if (!users.length) throw new Error('Could not find any users');

    return users;
  }
}
