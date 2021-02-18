import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, UseFilters, UseGuards } from '@nestjs/common'
import { PlayersService } from './players.service'
import { CreatePlayerDTO } from './dto/create-player.dto'
import { Response } from 'express'
import { MongoExceptionFilter } from '../filters/mongoose-exception.filter'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UpdatePlayerDTO } from './dto/update-player.dto'
import { ObjectId } from 'mongoose'

@Controller('players')
export class PlayersController {
  constructor (private readonly playersService: PlayersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('i/:_id')
  async getPlayerById(
    @Param('_id') _id: ObjectId,
    @Res() res: Response
  ) {
    const player = await this.playersService.getPlayerById(_id)
    if (!player) throw new NotFoundException('Player not found')
    return res.status(HttpStatus.OK).json(player)
  }

  // si → steamID
  @Get('si/:steamID')
  async getPlayerBySteamID(
    @Param('steamID') steamID: string,
    @Res() res: Response
  ) {
    const player = await this.playersService.getPlayerBySteamID(steamID)
    if (!player) throw new NotFoundException('Player not found')
    return res.status(HttpStatus.OK).json(player)
  }

  // u → username
  @Get('u/:username')
  async getPlayerByUsername(
    @Param('username') username: string,
    @Res() res: Response
  ) {
    const player = await this.playersService.getPlayerByUsername(username, true)
    if (!player) throw new NotFoundException('Player not found')
    return res.status(HttpStatus.OK).json(player)
  }

  // s → slug 
  @Get('s/:slug')
  async getPlayer(
    @Param('slug') slug: string,
    @Res() res: Response
  ) {
    const player = await this.playersService.getPlayerBySlug(slug)
    if (!player) throw new NotFoundException('Player not found')
    return res.status(HttpStatus.OK).json(player)
  }

  @Get('/')
  async getPlayers(
    @Res() res: Response
  ) {
    const players = await this.playersService.getPlayers()
    if (!players) throw new NotFoundException('There are not any players')
    return res.status(HttpStatus.OK).json(players)
  }

  @UseFilters(MongoExceptionFilter)
  @Post()
  async createPlayer(
    @Res() res: Response,
    @Body() createPlayerDTO: CreatePlayerDTO
  ) {
    await this.playersService.createPlayer(createPlayerDTO)
    return res.status(HttpStatus.OK).json({ message: 'Player added' })
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(MongoExceptionFilter)
  @Put(':_id')
  async updatePlayer(
    @Res() res: Response,
    @Body() updatePlayerDTO: UpdatePlayerDTO,
    @Param('_id') _id: ObjectId
  ) {
    const result = await this.playersService.updatePlayer(_id, updatePlayerDTO)
    if (!result) throw new NotFoundException('Player not found')
    return res.status(HttpStatus.OK).json({ message: 'Player updated' })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':_id')
  async deletePlayer(
    @Res() res: Response,
    @Param('_id') _id: ObjectId
  ) {
    await this.playersService.deletePlayer(_id)
    return res.status(HttpStatus.OK).json({ message: 'Player deleted' })
  }
}