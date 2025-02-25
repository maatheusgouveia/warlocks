import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':articleId')
  async getComments(@Param('articleId') articleId) {
    return this.commentsService.getCommentsByArticleId(articleId);
  }

  @Post(':articleId')
  async createComment(
    @Body() data: CreateCommentDto,
    @Param('articleId') articleId: string,
    @Request() req,
  ) {
    return this.commentsService.createComment({
      ...data,
      articleId,
      authorId: req.userId,
    });
  }

  @Delete(':id')
  async deleteComment(@Param('id') id, @Request() req) {
    return this.commentsService.deleteComment({
      id,
      authorId: req.userId,
    });
  }
}
