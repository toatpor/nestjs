import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './provider/post.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch.post.dto';
import { CreatePostDto } from './dtos/create.post.dto';
import { GetPostDto } from './dtos/get.post.dto';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  // Injection dependency intra-dependency
  constructor(private readonly postService: PostService) {}

  @Get()
  public getAllPost(@Query() postQuery: GetPostDto) {
    return this.postService.getAllPost(postQuery);
  }

  // get Post by userId
  @Get('/:userId?')
  public getPost(@Param('userId') userId: string) {
    return this.postService.findByUserId(userId);
  }

  // create Post
  @ApiOperation({
    summary: 'Create a new blog of post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  // update Post
  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'Get 200 response, if the post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.update(patchPostDto);
  }

  @Get('/get/:postId')
  public getPostById(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.getPostById(postId);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
