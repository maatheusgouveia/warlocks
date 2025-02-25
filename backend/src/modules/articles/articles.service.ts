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

  async createArticle(data: any) {
    return this.prisma.article.create({
      data,
    });
  }

  async deleteArticle(id: string) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
