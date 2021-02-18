import { ArrayMaxSize, MaxLength, MinLength, IsNotEmpty, IsOptional  } from 'class-validator'
import { ObjectId } from 'mongoose'

export class CreateTeamDTO {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  readonly name: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  readonly logo: string

  @IsOptional()
  @ArrayMaxSize(5)
  readonly players: ObjectId[]
  
  @IsOptional()
  readonly matches: ObjectId[]
}