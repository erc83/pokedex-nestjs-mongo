import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )    //necesita el nombre del modelo
    private readonly pokemonModel: Model<Pokemon>
  ){}

  // como es asincrona la insercion a la DB colocamos el async
  async create(createPokemonDto: CreatePokemonDto) {

      createPokemonDto.name = createPokemonDto.name.toLowerCase()

      try {
        const pokemon = await this.pokemonModel.create( createPokemonDto  )
  
        return pokemon
      } catch (error) {
        if ( error.code === 11000 ) {
          throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue )}`)
        }
        console.log(error)
        throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
      }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne( id_term: string) {
    let pokemon: Pokemon        // es de tipo my entity Pokemon

    // 1ra si el id es un numero
    if( !isNaN( +id_term ) ) { 
      pokemon = await this.pokemonModel.findOne({ num: id_term })
    }

    // MongoId  // hacer verificacion que es un mmongoID
    if( !pokemon && isValidObjectId( id_term ) ) {            // si no hay pokemon hace la busqueda por ID de mongo
      pokemon = await this.pokemonModel.findById( id_term )
    }

    // name
    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: id_term.toLowerCase().trim() })
    }

    // Si no existe el pokemon
    if( !pokemon ) throw new NotFoundException(`Pokemon with id, name or num "${ id_term }" not found`)

    return pokemon
  }

  async update( id_term: string, updatePokemonDto: UpdatePokemonDto ) {
    // no se puede actulizar un pokemon si no existe
    const pokemon = await this.findOne( id_term )  // reutilizamos la logica
    
    // Si hay porkemon recibimos el objeto de mongoose, donde tenemos los metodos overwrite populate remove replace entre otros
    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()       // si viene va estar en minuscula
    }

    await pokemon.updateOne( updatePokemonDto )

    return { ...pokemon.toJSON(), ...updatePokemonDto }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
