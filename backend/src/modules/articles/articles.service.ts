import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getAllArticles() {
    return this.prisma.article.findMany({
      where: {},
    });
  }
}
