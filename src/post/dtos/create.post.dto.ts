import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { addHours, formatISO } from 'date-fns';
import { PostTypes, Status } from '../enums/postType.enum';
import { CreatePostMetaOptionDto } from '@dir/meta-option/dtos/create.post-meta-options';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  // api-property work only property that required
  @ApiProperty({
    description: 'This is the tile for the blog post',
    example: 'this is a title',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostTypes,
    description: "Possible values, 'post','page','story','series' ",
  })
  @IsEnum(PostTypes)
  @IsNotEmpty()
  postType: PostTypes;

  @ApiProperty({
    description: "For Example - 'my-url'",
    example: 'my-blog-post',
  })
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: Status,
    description: 'Possible values: "draft","scheduled","review","published" ',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiPropertyOptional({
    description: 'This is the content of post',
    example: 'The post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example:
      '{\r\n "@context": "https://schme.org", \r\n "@type": "Person" \r\n }',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured Imaged for your blog post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date = formatISO(addHours(new Date(), 7)) as null as Date;

  @ApiPropertyOptional({
    description: 'Array of ids of tags',
    example: [1, 2],
  })
  @IsArray()
  @ArrayMinSize(1)
  // each : true mean check each value of the array
  // check each value is string or not
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The metaValue is a JSON string',
          example: '{sidebarEnabled: true}',
        },
      },
    },
  })
  @IsOptional()
  // working with nest-object need to use validateNested and Type
  @ValidateNested({ each: true })
  // type need to pass function as a argument and the output of this function
  // should be the final DTO you want to match
  // match incoming request to particular dto and create instance of Dto
  @Type(() => CreatePostMetaOptionDto)
  metaOptions?: CreatePostMetaOptionDto | null;

  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
