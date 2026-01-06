import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserCreateDto } from './dto/user-create.dto.js';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAll() {
    return this.userService.getAll();
  }

  @Post('/create')
  async createUser(@Body() data: UserCreateDto) {
    return this.userService.create(data);
  }
}
