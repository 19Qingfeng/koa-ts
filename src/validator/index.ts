import { validate as classValidate, ValidationError } from 'class-validator';
import createErrorModel from '../model/http-exception';

export default async function validate(data: any) {
  const errors: ValidationError[] = await classValidate(data);
  let message: string = '';
  if (errors.length > 0) {
    // throw HttpException Error
    errors.forEach((i) => {
      const constraints = i.constraints!;
      Object.keys(constraints).forEach((key) => {
        message += `${key}:${constraints[key]}.\n`;
      });
    });
    createErrorModel('params', message);
  }
}
