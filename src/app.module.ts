import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path' // en node
import { PokemonModule } from './pokemon/pokemon.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config'


@Module({
  imports: [
    
    ConfigModule.forRoot(),       // influye en la posicion

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot( process.env.MONGO_DB), // unique forRoot
    PokemonModule, CommonModule, SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env)
  }
}
