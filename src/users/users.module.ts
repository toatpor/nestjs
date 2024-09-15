import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
  // providers mean providing particular service to
  // the local component of the users module
  // business logic should be inside your provide class
  providers: [UserService, UsersCreateManyProvider],
  // exports can only with provider or service
  // this service will available to other module
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    // inject forFeature to typeOrm to let them know which entity gonna use
    TypeOrmModule.forFeature([User]),
    // injected the profile config inside user module
    ConfigModule.forFeature(profileConfig),
  ],
})
export class UsersModule {}
