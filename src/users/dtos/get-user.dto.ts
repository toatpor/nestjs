import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'Get user with specific Id',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  // normally query and param send and string
  // need to transformation logic here to convert
  // string to number by using class-transformer inside dto
  // what expecting to class validator to conversion
  @Type(() => Number)
  id?: number;
}
