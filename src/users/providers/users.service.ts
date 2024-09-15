import { CreateManyUserDto } from './../dtos/create.many-user.dto';
import { CreateUserDto } from './../dtos/create.user.dto';
import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user.dto';
import { AuthService } from 'src/auth/provider/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
/**
 * Class to connect to Users table and perform business operation
 */
@Injectable()
export class UserService {
  constructor(
    // circular dependency injection
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // injection config file env. global
    private readonly configService: ConfigService,

    // key will come from registerAs
    // using specific environment variable inside specific service
    @Inject(profileConfig.KEY)
    private readonly profile: ConfigType<typeof profileConfig>,

    // injectRepository
    @InjectRepository(User)
    private userRepository: Repository<User>,

    // inject another service inside provider
    private readonly userCreateManyProvider: UsersCreateManyProvider,
  ) {}
  /**
   * The method to get all the users from database
   */
  public findAllUsers(
    _getUserParamDto: GetUserParamDto,
    _limit: number,
    _page: number,
  ) {
    // custom handle exception
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The api endpoint does not exist',
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured because the API endpoint was permanently moved',
      },
    );
  }

  /**
   * The method to get specific user from database by Id  of user
   */
  public async findById(id: number) {
    let user = undefined;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }
    if (!user) throw new BadRequestException('The user id does not exist');
    return user;
  }

  public async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  public async createUser(createUserDto: CreateUserDto) {
    let checkEmail = undefined;
    try {
      checkEmail = await this.findByEmail(createUserDto.email);
    } catch (_error) {
      // can save error to database for knowing error occur
      // request that occur and take to long of period
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }

    if (checkEmail)
      throw new BadRequestException(
        'An email already exists, Please provide or check your email',
      );

    let newUser = this.userRepository.create(createUserDto);

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (_error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error connecting to the database' },
      );
    }
    return newUser;
  }

  public async createManyUser(createManyUserDto: CreateManyUserDto) {
    return await this.userCreateManyProvider.createMany(createManyUserDto);
  }
}
