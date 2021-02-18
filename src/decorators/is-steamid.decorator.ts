import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator'
import * as c from '../constants'

export const IS_STEAM_ID = 'isName'

export function isSteamID(value: unknown): boolean {
  return typeof value === 'string' && !!value.match(c.STEAM_ID) 
}

export function IsSteamID(options?: any, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_STEAM_ID,
      constraints: [options],
      validator: {
        validate: (value): boolean => isSteamID(value),
        defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property contains not allowed characters', validationOptions)
      }
    },
    validationOptions
  )
}