import { Schema } from 'mongoose'

export const PlayerSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  steamName: String,
  steamID: {
    type: String,
    unique: true,
  },
  slug: String,
})