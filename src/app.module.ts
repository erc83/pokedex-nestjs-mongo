import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path' // en node
import { PokemonModule } from './pokemon/pokemon.module'
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot('mongodb://localhost:27019/nest-pokemon'), // unique forRoot
    PokemonModule
  ],
})
export class AppModule {}
