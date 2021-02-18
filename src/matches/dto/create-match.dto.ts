import {} from 'class-validator'
import { IsSteamID } from '../../decorators'

export class CreateMatchDTO {
  readonly info: Info
  readonly teams: Team[]
}

class Info {
  readonly map: string
  readonly rounds: number
}

class Team {
  readonly name: string
  readonly sides: string[]
  readonly members: Member[]
  readonly score: number
  readonly firstHalf: number
  readonly secondHalf: number
}

class Member {
  @IsSteamID()
  readonly steamID: string

  readonly name: string
  readonly stats: Stats
}

class Stats {
  readonly kills: number
  readonly assists: number
  readonly deaths: number
  readonly headShotKills: number
  readonly damage: number
  readonly threeK: number
  readonly fourK: number
  readonly fiveK: number 
  readonly mvps: number
  readonly score: number
  readonly hsp: number
  readonly kd: number
  readonly adr: number
  readonly weapons: { [key: string]: number }
}