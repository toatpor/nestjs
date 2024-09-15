import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './provider/post.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { MetaOption } from '../meta-option/meta-option.entity';
import { TagsModule } from '../tags/tags.module';
import { PaginationModule } from '@dir/common/pagination/pagination.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  // need to import entire module
  // nest.js will only import the service or provider that have been
  // explicitly exported from user module
  // forFeature responding to generate or create table corresponding to these entities inside database
  imports: [
    PaginationModule,
    UsersModule,
    TypeOrmModule.forFeature([Posts, MetaOption]),
    TagsModule,
  ],
})
export class PostModule {}
