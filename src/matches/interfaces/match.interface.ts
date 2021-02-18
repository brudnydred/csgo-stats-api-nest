import { Document } from 'mongoose'

export interface IMatch extends Document {
  readonly info: IInfo
  readonly teams: ITeam[]
}

interface IInfo {
  readonly map: string
  readonly rounds: number
}

interface ITeam {
  readonly name: string
  readonly sides: string[]
  readonly members: IMember[]
  readonly score: number
  readonly firstHalf: number
  readonly secondHalf: number
}

interface IStats {
  readonly kills: number,
  readonly assists: number,
  readonly deaths: number,
  readonly headShotKills: number,
  readonly damage: number, 
  readonly threeK: number,
  readonly fourK: number, 
  readonly fiveK: number, 
  readonly mvps: number, 
  readonly score: number, 
  readonly hsp: number, 
  readonly kd: number, 
  readonly adr: number,
  readonly weapons: { [key: string]: number }
}

interface IMember {
  readonly steamID: string
  readonly name: string
  readonly stats: IStats
}