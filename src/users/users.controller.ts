import { UserService } from './providers/users.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { GetUserParamDto } from './dtos/get-user.dto';
import { PatchUserDto } from './dtos/patch.user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUserDto } from './dtos/create.many-user.dto';

// http://localhoost:3000
// all routing will point to localhost

//read
// http://localhost:3000/users
// this will url followed by users should be handle by this controller
// handle request that related to users api end point
// will re-direct to  particular this controller

@Controller('users')
// All method inside the particular  controller
// would be added to specific group on the swagger documentation
@ApiTags('Users')
export class UsersController {
  // inject service now it available to do business logic
  constructor(private readonly userService: UserService) {}
  // /:id? will make id param as optional
  // need to have mandatory param first before get optional params
  @Get('/:id?')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  @ApiOperation({
    summary: 'Fetches a list of registered user',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  // get specific key value pair from params and query by pass it to
  // decorator
  public getUsers(
    // validate specific param with pipe need to specify specific key
    // @Param('id', ParseIntPipe) params: number | undefined,
    // read validate incoming request from param and query by dto
    @Param() getUserParamDto: GetUserParamDto,
    // default value for limit query for limit and page
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAllUsers(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(
    @Body() createUserDto: CreateUserDto,
    // @Headers() header: any,
    // @Ip() ip: any,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }

  @Post('create-many')
  public createManyUser(@Body() createManyUserDto: CreateManyUserDto) {
    return this.userService.createManyUser(createManyUserDto);
  }
}
