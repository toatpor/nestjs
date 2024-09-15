import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    // circular dependency injection
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  public login(email: string, password: string, id: string) {
    const user = this.userService.findById(1234);

    return 'Sample_token';
  }

  public isAuth() {
    return true;
  }
}
