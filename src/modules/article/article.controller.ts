import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBody, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { Article } from './entities/article.entity';
@ApiInternalServerErrorResponse({description : "Internal server error"})
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
@ApiOkResponse()
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }
@ApiOkResponse({description :"list of articles" ,
  type :Article
})
@ApiBody({type : CreateArticleDto})
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
