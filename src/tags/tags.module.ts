import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { TagsService } from './services/tags.service';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tags])],
  exports: [TagsService],
  providers: [TagsService],
})
export class TagsModule {}
