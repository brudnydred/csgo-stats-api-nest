import { Controller, Get, Post, Put, Delete, HttpStatus, NotFoundException, UseGuards, Res, Param, Body, UseFilters } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { Response } from 'express'
import { ObjectId } from 'mongoose'
import { CreateTeamDTO } from './dto/create-team.dto'
import { UpdateTeamDTO } from './dto/update-team.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getTeams(
    @Res() res: Response
  ) {
    const teams = await this.teamsService.getTeams()
    if (!teams) throw new NotFoundException('There are not any teams')
    return res.status(HttpStatus.OK).json(teams)
  }

  @UseGuards(JwtAuthGuard)
  @Get('i/:_id')
  async getTeamById(
    @Res() res: Response,
    @Param('_id') _id: ObjectId
  ) {
    const team = await this.teamsService.getTeamById(_id)
    if (!team) throw new NotFoundException('Team not found')
    return res.status(HttpStatus.OK).json(team)
  }

  @Get('n/:name')
  async getTeamByName(
    @Res() res: Response,
    @Param('name') name: string
  ) {
    const team = await this.teamsService.getTeamByName(name)
    if (!team) throw new NotFoundException('Team not found')
    return res.status(HttpStatus.OK).json(team)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTeam(
    @Res() res: Response,
    @Body() createTeamDTO: CreateTeamDTO
  ) {
    await this.teamsService.createTeam(createTeamDTO)
    return res.status(HttpStatus.OK).json({ message: 'Team added' })
  }

  @UseGuards(JwtAuthGuard)
  @Put(':_id')
  async updateTeam(
    @Res() res: Response,
    @Body() updateTeamDTO: UpdateTeamDTO,
    @Param('_id') _id: ObjectId   
  ) {
    const result = await this.teamsService.updateTeam(_id, updateTeamDTO)
    if (!result) throw new NotFoundException('Team not found')
    return res.status(HttpStatus.OK).json({ message: 'Team updated' })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':_id')
  async deleteTeam(
    @Res() res: Response,
    @Param('_id') _id: ObjectId
  ) {
    await this.teamsService.deleteTeam(_id)
    return res.status(HttpStatus.OK).json({ message: 'Team deleted' })
  }
}