import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionDto } from './dtos/create.post-meta-options';

@Controller('meta-option')
export class MetaOptionController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  public create(@Body() createPostMetaOptionDto: CreatePostMetaOptionDto) {
    return this.metaOptionsService.create(createPostMetaOptionDto);
  }
}
