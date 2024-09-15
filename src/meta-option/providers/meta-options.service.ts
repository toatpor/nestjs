import { MetaOption } from './../meta-option.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionDto } from '../dtos/create.post-meta-options';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}
  public async create(createPostMetaOptionsDto: CreatePostMetaOptionDto) {
    const metaOption = this.metaOptionRepository.create(
      createPostMetaOptionsDto,
    );

    return await this.metaOptionRepository.save(metaOption);
  }
}
