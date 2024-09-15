import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/providers/users.service';
import { Posts } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create.post.dto';
import { TagsService } from './../../tags/services/tags.service';
import { PatchPostDto } from '../dtos/patch.post.dto';
import { GetPostDto } from '../dtos/get.post.dto';
import { PaginationProvider } from '@dir/common/pagination/providers/pagination.provider';
@Injectable()
export class PostService {
  // inter-module dependency injection
  // injecting Users service to post module
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,

    private readonly tagService: TagsService,

    private readonly paginationProvider: PaginationProvider,
    // @InjectRepository(MetaOption)
    // private metaRepository: Repository<MetaOption>,
  ) {}
  public findByUserId(userId: string) {
    const user = this.userService.findById(parseInt(userId, 10));

    return [
      {
        user: user,
        title: 'dick',
      },
      {
        user: user,
        title: 'dick 2',
      },
    ];
  }

  public async createPost(@Body() createPostDto: CreatePostDto) {
    // with cascade inside entity no need to create meta-option first before create post entity
    // Cascade can create meta option along with post in single save operation
    const author = await this.userService.findById(createPostDto.authorId);
    const tags = await this.tagService.findMultipleTags(createPostDto.tags);

    const post = this.postRepository.create({
      ...createPostDto,
      tags,
      author: author,
    });

    return await this.postRepository.save(post);
  }

  public async getPostById(id: number) {
    return await this.postRepository.findOne({
      where: { id: id },
      // withDeleted: true,
      relations: { tags: true, author: true, metaOptions: true },
    });
  }

  public async getAllPost(postQuery: GetPostDto) {
    // get the relations between table
    const posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepository,
    );
    return posts;
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true, id };
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;
    try {
      tags = await this.tagService.findMultipleTags(patchPostDto.tags);
      post = await this.postRepository.findOne({
        where: { id: patchPostDto.id },
      });
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment please try again',
        { description: 'Error connection to the database' },
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length || !post)
      throw new BadRequestException(
        'tags or post are incorrect ID please check again',
      );

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.slug = patchPostDto.slug ?? post.slug;
    post.postType = patchPostDto.postType ?? post.postType;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    post.tags = tags;

    // save are save new instance to database and also update existing

    try {
      await this.postRepository.save(post);
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment please try again',
        { description: 'Error connection to the database' },
      );
    }

    return post;
  }
}
