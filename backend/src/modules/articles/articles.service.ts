import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getAllArticles() {
    return this.prisma.article.findMany({
      include: {
        comments: true,
        author: true,
      },
    });
  }

  async createArticle(data) {
    return this.prisma.article.create({
      data,
    });
  }

  async deleteArticle(data: { id: string; authorId: string }) {
    const { id, authorId } = data;

    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== authorId) {
      throw new ForbiddenException(
        'You are not authorized to delete this article',
      );
    }

    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
