import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
    });
  }

  async deleteUserById(userId: string) {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  async createUser(data) {
    try {
      return this.prisma.user.create({
        data: {
          role: Role.USER,
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
