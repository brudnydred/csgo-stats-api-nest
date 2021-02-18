import { Schema } from 'mongoose'

export const MatchSchema = new Schema({
  info: {
    map: String,
    rounds: Number,
  },
  teams: [{
    name: String,
    sides: [String],
    score: Number, 
    firstHalf: Number,
    secondHalf: Number,
    members: [{
      steamID: String,
      name: String,
      stats: {
        kills: Number,
        assits: Number,
        deaths: Number,
        headShotKills: Number,
        damage: Number,
        utilityDamage: Number,
        threeK: Number,
        fourK: Number, 
        fiveK: Number,
        kd: Number,
        adr: Number,
        hsp: Number,
        flashedPlayers: Number,
        mvps: Number,
        score: Number,
        weapons: {}
      }
    }]
  }]
})