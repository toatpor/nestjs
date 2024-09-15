import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUserDto } from '../dtos/create.many-user.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    // inject DataSource connection for queryRunner
    private readonly dataSource: DataSource,
  ) {}
  public async createMany(createManyUserDto: CreateManyUserDto) {
    const newUsers: User[] = [];
    // create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // connect QueryRunner to database
      await queryRunner.connect();
      // start transaction
      await queryRunner.startTransaction();
    } catch (_error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Database connection',
      });
    }

    try {
      for (const element of createManyUserDto.users) {
        // which entity you want to create, object that you want to create
        const findUserByEmail = await queryRunner.manager.findOne(User, {
          where: {
            email: element.email,
          },
        });

        if (findUserByEmail)
          throw new ConflictException(
            'An email already exists, Please provide or check email ',
          );

        const newUser = queryRunner.manager.create(User, element);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // commit transaction only once
      await queryRunner.commitTransaction();
    } catch (_error) {
      await queryRunner.rollbackTransaction();
      // if can find any user, throw error out for response
      throw _error;
    } finally {
      try {
        await queryRunner.release();
      } catch (_error) {
        throw new RequestTimeoutException('Unable to release connection');
      }
    }
    // release connection
    return newUsers;
  }
}
