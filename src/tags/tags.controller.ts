import { CreateTagsDto } from './dtos/create.tags.dto';
import { TagsService } from './services/tags.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public async create(@Body() createTagsDto: CreateTagsDto) {
    return this.tagsService.create(createTagsDto);
  }

  @Delete()
  public async delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  @Delete('soft-delete')
  public async softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }

  @Patch('update-soft-delete/:id')
  public async updateSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.removeSoftRemove(id);
  }
}
