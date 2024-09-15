import { CreatePostDto } from './../../post/dtos/create.post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The Id of the post that needs to be updated' })
  @Type(() => Number)
  id: number;
}
