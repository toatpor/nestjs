import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateUserDto } from './create.user.dto';

//custom class validation
@ValidatorConstraint({ name: 'IsEqualTo', async: false })
class IsEqualTo implements ValidatorConstraintInterface {
  // validation logic, validation Argument will point to Object that we want
  validate(value: string, args: ValidationArguments) {
    // console.log(value, args);
    // which field you want to compare
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as CreateUserDto)[relatedPropertyName];
    return value === relatedValue;
  }
  defaultMessage(args: any) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must equal ${relatedPropertyName}`; // Custom error message
  }
}

// read
//generate custom validation decorator for using to compare
export function IsEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: CreateUserDto, propertyName: string) => {
    registerDecorator({
      name: 'isEqual',
      target: object.constructor,
      propertyName: propertyName,
      // which field you want to compare
      constraints: [property],
      options: validationOptions,
      // which  custom class validate want to use for validate your logic
      validator: IsEqualTo,
    });
  };
}
