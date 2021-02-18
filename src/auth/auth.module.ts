import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PlayersModule } from '../players/players.module' 
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PlayersModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}