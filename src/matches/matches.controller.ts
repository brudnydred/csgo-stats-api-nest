import { Controller, Body, Get, Put, Post, Delete, HttpStatus, UseGuards, UseFilters, Res } from '@nestjs/common'
import { Response } from 'express'
import { CreateMatchDTO } from './dto/create-match.dto'


@Controller()
export class MatchesController {}