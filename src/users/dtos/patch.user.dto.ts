import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';

// take all property of create Dto class maintain all validation
// logic make all properties of createUser Dto As optional properties
// by using PartialType mapped-types
// create Dtos from parent DtoS
export class PatchUserDto extends PartialType(CreateUserDto) {}
