import { Injectable } from '@nestjs/common'
import { Model, ObjectId } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IPlayer } from './interfaces/player.interface'
import { CreatePlayerDTO } from './dto/create-player.dto'
import { UpdatePlayerDTO } from './dto/update-player.dto'
import { slugify } from '../helpers'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PlayersService {
  constructor(@InjectModel('Player') private readonly playerModel: Model<IPlayer>) {}

  async getPlayerById(_id: ObjectId): Promise<IPlayer> {
    const player = await this.playerModel.findOne({ _id: _id }, '-password')
    return player
  }

  async getPlayerByUsername(username: string, secured: boolean): Promise<IPlayer> {
    const player = await this.playerModel.findOne({ username: username }, secured ? '-password' : '')
    return player
  }

  async getPlayerBySteamID(steamID: string): Promise<IPlayer> {
    const player = await this.playerModel.findOne({ steamID: steamID }, '-password')
    return player
  }

  async getPlayerBySlug(slug: string): Promise<IPlayer> {
    const player = await this.playerModel.findOne({ slug: slug }, '-password')
    return player
  }

  async getPlayers(): Promise<IPlayer[]> {
    const players = await this.playerModel.find().select('-password')
    return players
  }

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<boolean> {
    const slug: string = slugify(createPlayerDTO.username)
    const verifiedSlug: string = await this.verifySlug(slug)
  
    const hash = this.hashPassword(createPlayerDTO.password)

    await new this.playerModel({
      username: createPlayerDTO.username,
      password: hash,
      steamName: createPlayerDTO.steamName,
      steamID: createPlayerDTO.steamID,
      slug: verifiedSlug
    }).save()
    return true
  }

  async updatePlayer(_id: ObjectId, updatePlayerDTO: UpdatePlayerDTO): Promise<boolean> {
    const { password, ...rest } = updatePlayerDTO
    let verifiedSlug: string 
    let hash: string

    const player = await this.playerModel.findById({ _id: _id })

    if (!player) return false

    if (player.username !== rest.username && rest.username) {
      const slug: string = slugify(rest.username)
      verifiedSlug = await this.verifySlug(slug)
    }

    if (password) hash = await this.hashPassword(password)
    
    await player.updateOne({
      $set: { 
        ...rest, 
        slug: verifiedSlug ? verifiedSlug : player.slug,
        password: password ? hash : player.password
      } 
    })

    return true
  }

  async deletePlayer(_id: ObjectId): Promise<boolean> {
    await this.playerModel.findByIdAndDelete({ _id: _id })
    return true
  }

  private hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  private verifySlug = async (slug: string): Promise<string> => {
    const playersBySlugs: IPlayer[] = await this.playerModel.find({ slug: { $regex: slug } })
    let nextSlug: string

    if (playersBySlugs.length !== 0) {
      if (playersBySlugs.length === 1) {
        nextSlug = `${slug}-1`
      } else {
        const r: RegExp = /\d+$/g
        let num: number = +`${playersBySlugs[playersBySlugs.length - 1].slug.match(r)}` + 1
        nextSlug = `${slug}-${num}`
      }
    } else {
       return slug
    }
    return nextSlug
  }
}