import { Injectable } from '@nestjs/common';
// import axios , { AxiosInstance } from 'axios'     // se van por la creacion del adapter de axios
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose'
import { AxiosAdapter } from 'src/common/http-adapters/axios.adapter';

@Injectable()
export class SeedService {

   //crea visualmente que es una dependencia de mi servicio

  constructor(
    @InjectModel( Pokemon.name )    //InjecModel de @nestjs/mongoose; Pokemon de entity
    private readonly pokemonModel: Model<Pokemon>, // Model de mongoose

    private readonly httpAdapter: AxiosAdapter,
  ) {}


  async executeSeed() {

    await this.pokemonModel.deleteMany({}) // limpieza de database

    // se desestructuro la data en el axios.adapter.ts
    const data = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonToInsert: { name: string, num: number }[]  = []

    // manejo de data
    data.results.forEach(( { name, url }) => {

      const segments = url.split('/')
      const num = +segments[ segments.length - 2 ]
    
      //console.log({ name, num })
      //const pokemon =  this.pokemonModel.create({ name, num })
      pokemonToInsert.push({ name, num })   // [{ name: bulbasaur, no: 1}]

    })

    //return data.results    // copiar la respuesta de data en postman y crear la interface PokeResponse
    // return data.        -> count, next, previous, result
    
    await this.pokemonModel.insertMany( pokemonToInsert )
    return 'Seed Execute'
  }
}
