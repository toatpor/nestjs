import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { IsEqual } from './custom.user.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  // using regex
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&./])[A-Za-z\d@$!%*#?&./]{8,}$/,
    {
      message:
        'Minimum eight characters, at least one letter, one number and one special character',
    },
  )
  password: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsEqual('password')
  // confirmPassword: string;
}
