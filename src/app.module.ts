import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionModule } from './meta-option/meta-option.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import envValidation from './config/env.validation';

const env = process.env.NODE_ENV;

@Module({
  // app module will import entire file that
  // associate with user module into application
  // nest.js would be able to use those file
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // which env file you gonna use
      envFilePath: !env ? '.env' : `.env.${env}`,
      // get separate config file from registerAs
      load: [appConfig, databaseConfig],
      // validate environment variable  file
      validationSchema: envValidation,
    }),
    UsersModule,
    PostModule,
    AuthModule,
    // forRoot setting for your database
    // can read different env files from your application
    // convert connection with database to asynchronous connection
    TypeOrmModule.forRootAsync({
      // inject for typeOrm
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User, Posts],
        // getting environment variable from config file
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.DB'),
        host: configService.get('database.host'),
      }),
    }),
    TagsModule,
    MetaOptionModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
