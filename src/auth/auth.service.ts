import { Injectable, NotFoundException } from '@nestjs/common'
import { PlayersService } from '../players/players.service'
import * as bcrypt from 'bcrypt'
import { ILoginPlayer } from 'src/players/interfaces/player.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private playersService: PlayersService,
    private jwtService: JwtService
  ) {}

  async validatePlayer(username: string, password: string): Promise<ILoginPlayer> {
    const player = await this.playersService.getPlayerByUsername(username, false)
    if (!player) throw new NotFoundException('Incorrect username')
    const isMatch = await bcrypt.compare(password, player.password)

    if (player && isMatch) {
      const { password, ...result } = player.toJSON()
      return result
    }
    return null
  }

  async login(player: any) {
    const payload: ILoginPlayer = {
      _id: player._id, 
      username: player.username, 
      steamName: player.steamName,
      steamID: player.steamID,
      slug: player.slug
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}``