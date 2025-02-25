import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article';

@ApiBearerAuth('authorization')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async getArticles() {
    return this.articlesService.getAllArticles();
  }

  @Post()
  async createArticle(@Body() data: CreateArticleDto, @Request() req) {
    return this.articlesService.createArticle({
      ...data,
      authorId: req.userId,
    });
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id, @Request() req) {
    return this.articlesService.deleteArticle({
      id,
      authorId: req.userId,
    });
  }
}
