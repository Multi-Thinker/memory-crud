import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, { abortEarly: false });

    if (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        details: error.details.map((detail) => detail.message),
      });
    }

    return value;
  }
}
