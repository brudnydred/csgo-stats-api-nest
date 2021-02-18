import { Types, Schema } from 'mongoose'

export const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String, 
    required: true, 
    unique: true
  },
  players: [Types.ObjectId],
  matches: [Types.ObjectId]
})