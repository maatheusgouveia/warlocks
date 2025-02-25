import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getCommentsByArticleId(articleId: string) {
    return this.prisma.comment.findMany({
      where: {
        articleId,
      },
    });
  }

  async createComment(data) {
    console.log(data);
    return this.prisma.comment.create({
      data,
    });
  }

  async deleteComment(data: { id: string; authorId: string }) {
    const { id, authorId } = data;

    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== authorId) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
