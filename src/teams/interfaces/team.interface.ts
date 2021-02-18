import { Document, ObjectId } from 'mongoose'

export interface ITeam extends Document {
  readonly name: string,
  readonly logo: string,
  readonly players: ObjectId[],
  readonly matches: ObjectId[]
}