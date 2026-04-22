import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { ArticleResponsedto } from './dto/article-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import  { diskStorage}from "multer"
import path from "path"
@ApiInternalServerErrorResponse({description : "Internal server error"})
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
@ApiOkResponse()
  @ApiNoContentResponse({description : "Article not found"})
  @ApiBody({ })
@HttpCode(201)
  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("file" , {
storage : diskStorage({
  destination : path.join(process.cwd(), "uploads" ),
  filename :(req , file , cb) => {
    const uniquesuffix =  `${file.originalname}${Date.now()}`
    const ext = path.extname(file.originalname)
    cb(null, `${uniquesuffix}${ext}`)
  }
})
    })
  )

  create(@Body() createArticleDto: CreateArticleDto , @UploadedFile() file :Express.Multer.File) {
    return this.articleService.create(createArticleDto  , file);
  }
@ApiOkResponse({description :"list of articles" ,
  type :[ArticleResponsedto]
})
  @ApiNoContentResponse({description : "Article not found"})
 @HttpCode(200)
  @Get()
 
  findAll() {
    return this.articleService.findAll();
  }
  @ApiNoContentResponse({description : "Article not found"})
@HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }
  @ApiOkResponse({description : "Updated"})
    @ApiNoContentResponse({description : "Article not found"})
@HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }
   @ApiOkResponse({description : "Deleted"})
    @ApiNoContentResponse({description : "Article not found"})
@HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
