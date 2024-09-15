import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],

  // when is circle dependency injection need to use forward-ref
  imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
