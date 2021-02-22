import { Injectable} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { ITeam } from './interfaces/team.interface'
import { Model, ObjectId, Types } from 'mongoose'
import { CreateTeamDTO } from './dto/create-team.dto'
import { UpdateTeamDTO } from './dto/update-team.dto'

@Injectable()
export class TeamsService {
  constructor(@InjectModel('Team') private readonly teamModel: Model<ITeam>) {}

  async getTeamById(_id: ObjectId): Promise<ITeam> {
    const team = await this.teamModel.findById({ _id: _id })
    return team
  }

  async getTeamByName(name: string): Promise<ITeam> {
    const team = await this.teamModel.findOne({ name: name })
    return team
  }

  async getTeams(): Promise<ITeam[]> {
    const teams = await this.teamModel.find()
    return teams
  }

  async createTeam(createTeamDTO: CreateTeamDTO): Promise<boolean> {
    await new this.teamModel(createTeamDTO).save()
    return true
  }

  async updateTeam(_id: ObjectId, updateTeamDTO: UpdateTeamDTO): Promise<boolean> {
    const team = await this.teamModel.findById({ _id: _id })

    if (!team) return false

    await team.updateOne({ $set: { ...updateTeamDTO } })
    return true
  }

  async addPlayers(_id: ObjectId, players: ObjectId[]): Promise<boolean> {
    const team = await this.teamModel.findById({ _id: _id })

    console.log({
      p1: players,
      p2: team.players
    })

    if (!team) return false
    if ((players.length + team.players.length) > 5) return false
    if (this.isDuplicateInArray(players, team.players)) return false
    
    await team.updateOne({ $push: { players: { $each: [...players] } } })
    return true
  }

  async deleteTeam(_id: ObjectId): Promise<boolean> {
    await this.teamModel.findByIdAndDelete({ _id: _id })
    return true
  }

  private isDuplicateInArray = (a1: any[], a2: any[]): boolean => a1.map(x => a2.some(y => y == x)).some(v => v === true)
}