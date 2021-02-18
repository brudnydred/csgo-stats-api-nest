import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { PlayersModule } from './players/players.module'
import { AuthModule } from './auth/auth.module'
import { TeamsModule } from './teams/teams.module'
import { MatchesModule } from './matches/matches.module' 

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    PlayersModule,
    AuthModule, 
    TeamsModule, 
    MatchesModule
  ],
  controllers: [AppController]
})
export class AppModule {}
