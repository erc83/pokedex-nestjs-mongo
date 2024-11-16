import { Injectable } from '@nestjs/common';
import axios , { AxiosInstance } from 'axios'
import { PokeResponse } from './interface/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios //crea visualmente que es una dependencia de mi servicio


  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    // manejo de data
    data.results.forEach(( { name, url }) => {

      const segments = url.split('/')
      const num = +segments[ segments.length - 2 ]
      
      console.log({ name, num })

    })

    return data.results    // copiar la respuesta de data en postman y crear la interface PokeResponse
    // return data.        -> count, next, previous, result
  }
}
