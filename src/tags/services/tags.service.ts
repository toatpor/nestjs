import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from '../tags.entity';
import { In, Repository } from 'typeorm';
import { CreateTagsDto } from '../dtos/create.tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  public async create(createTagsDto: CreateTagsDto) {
    const newTags = this.tagsRepository.create(createTagsDto);
    return await this.tagsRepository.save(newTags);
  }

  public async findMultipleTags(tags: number[]) {
    // in function take in array of id , it will fid all the tags that have id of it
    const result = await this.tagsRepository.find({
      where: { id: In(tags) },
    });
    return result;
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return { delete: true, id };
  }

  public async softRemove(id: number) {
    await this.tagsRepository.softDelete(id);
    return { delete: true, id };
  }

  public async removeSoftRemove(id: number) {
    const tag = await this.tagsRepository.findOne({
      where: { id: id },
      withDeleted: true,
    });

    tag.deleteDate = null;
    return await this.tagsRepository.save(tag);
  }
}
