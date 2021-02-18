import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ILoginPlayer } from 'src/players/interfaces/player.interface'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<ILoginPlayer> {
    const player = await this.authService.validatePlayer(username, password)
    if (!player) throw new UnauthorizedException('Incorrect password')
    return player
  }
}