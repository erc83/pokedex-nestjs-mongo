import { Injectable } from '@nestjs/common';
import axios , { AxiosInstance } from 'axios'
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose'

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios //crea visualmente que es una dependencia de mi servicio

  constructor(
    @InjectModel( Pokemon.name )    //InjecModel de @nestjs/mongoose; Pokemon de entity
    private readonly pokemonModel: Model<Pokemon> // Model de mongoose
  ) {}


  async executeSeed() {

    await this.pokemonModel.deleteMany({}) // limpieza de database

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

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
