import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async getArticles() {
    return this.articlesService.getAllArticles();
  }
}
