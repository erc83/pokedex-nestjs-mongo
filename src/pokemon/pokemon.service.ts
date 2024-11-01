import { Injectable } from '@nestjs/common';
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

      const pokemon = await this.pokemonModel.create( createPokemonDto  )

      return pokemon
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
