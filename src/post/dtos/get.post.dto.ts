import { PaginationQueryDto } from '@dir/common/pagination/dto/pagination';
import { IntersectionType } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

class getPostDtoBase {
  @IsDate()
  @IsOptional()
  // @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsOptional()
  // @Type(() => Date)
  endDate: Date;
}

export class GetPostDto extends IntersectionType(
  getPostDtoBase,
  PaginationQueryDto,
) {}
