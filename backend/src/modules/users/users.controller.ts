import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { Public } from 'src/decorators/public.decorator';

@ApiBearerAuth('authorization')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    const user = this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  @Public()
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): string {
    const success = this.usersService.deleteUserById(id);
    if (!success) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} successfully deleted`;
  }
}
