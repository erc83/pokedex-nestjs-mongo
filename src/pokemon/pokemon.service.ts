import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    // MongoId

    // name

    // Si no existe el pokemon
    if( !pokemon ) throw new NotFoundException(`Pokemon with id, name or num "${ id_term }" not found`)

    return pokemon
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
