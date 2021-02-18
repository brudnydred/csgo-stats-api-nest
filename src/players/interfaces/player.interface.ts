import { Document } from 'mongoose'

export interface IPlayer extends Document {
  readonly username: string
  readonly password: string
  readonly steamName: string
  readonly steamID: string
  readonly slug: string
}

export interface ILoginPlayer {
  readonly _id?: any
  readonly username: string
  readonly steamName: string
  readonly steamID: string
  readonly slug: string
  readonly __v?: number
}