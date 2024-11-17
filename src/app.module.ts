import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path' // en node
import { PokemonModule } from './pokemon/pokemon.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config'
import { envConfiguration } from './config/env.config'


@Module({
  imports: [
    // influye en la posicion
    ConfigModule.forRoot({
      //envFilePath                 // paso del archivo de env si lo queremos leer de otro lugar
      load: [ envConfiguration ],   // cargamos desde env.config
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot( process.env.MONGO_DB), // unique forRoot
    PokemonModule, CommonModule, SeedModule,
  ],
})
export class AppModule {
  constructor() {}
}
