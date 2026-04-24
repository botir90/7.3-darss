import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo : Repository<Tag>){}
  async create(createTagDto: CreateTagDto , userId : number) {
    const foundedtag = await this.tagRepo.findOne({where :{name : createTagDto.name}})

    if(foundedtag) throw new BadRequestException("tag nam already exists")
      const tag = this.tagRepo.create(createTagDto)
    return await this.tagRepo.save(tag) ;
  }

   async findAll() {
    return this.tagRepo.find();
  }

   async findOne(id: number) {
const foundedtag = await this.tagRepo.findOne({where :{id}})

if (!foundedtag) throw new NotFoundException("tag not found")
    return foundedtag
  }

   async update(id: number, updateTagDto: UpdateTagDto) {
    const foundedtag = await this.tagRepo.findOne({where :{id}})

if (!foundedtag) throw new NotFoundException("tag not found")
  await this.tagRepo.update(foundedtag.id , updateTagDto)
    return {message : " Updated"}
  }

   async remove(id: number) {
    const foundedtag = await this.tagRepo.findOne({where :{id}})

if (!foundedtag) throw new NotFoundException("tag not found")
  await this.tagRepo.delete(foundedtag.id)
    return  {message : "deleted"}
  }
}
