import { MinLength, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { IsName, IsSteamID } from '../../decorators'

export class UpdatePlayerDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsName()
  @MinLength(3)
  @MaxLength(30)
  readonly username?: string

  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  readonly password?: string

  @IsOptional()
  @MaxLength(50)
  readonly steamName?: string

  @IsOptional()
  @IsNotEmpty()
  @IsSteamID()
  readonly steamID?: string
}