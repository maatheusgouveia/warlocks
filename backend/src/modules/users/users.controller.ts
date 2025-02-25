import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    const user = this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
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
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return `Usuário com ID ${id} deletado com sucesso`;
  }
}
