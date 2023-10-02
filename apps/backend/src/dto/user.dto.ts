import * as Joi from 'joi';

export class UserDto {
  static readonly schema = Joi.object({
    id: Joi.string(),
    username: Joi.string().min(4).max(50).required(),
    firstName: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(55).required(),
  });
  static readonly updateSchema = Joi.object({
    id: Joi.string(),
    firstName: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(55).required(),
  });

  static readonly idSchema = Joi.string().required();
}
