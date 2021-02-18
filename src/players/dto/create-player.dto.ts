import { MinLength, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { IsName, IsSteamID } from '../../decorators'

export class CreatePlayerDTO {
  @IsNotEmpty()
  @IsName()
  @MinLength(3)
  @MaxLength(30)
  readonly username: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  readonly password: string

  @IsOptional()
  @MaxLength(50)
  readonly steamName: string

  @IsNotEmpty()
  @IsSteamID()
  readonly steamID: string
}