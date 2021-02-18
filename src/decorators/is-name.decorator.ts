import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator'
import * as c from '../constants'

export const IS_NAME = 'isName'

export function isName(value: unknown): boolean {
  return typeof value === 'string' && !value.match(c.NOT_USERNAME) 
}

export function IsName(options?: any, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_NAME,
      constraints: [options],
      validator: {
        validate: (value): boolean => isName(value),
        defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property contains not allowed characters', validationOptions)
      }
    },
    validationOptions
  )
}