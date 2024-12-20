import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  // @HttpCode( 200 )                      // decorador para manejar el codigo de error y personalizar el codigo de error
  // @HttpCode( HttpStatus.OK )           // 200
  // @HttpCode( HttpStatus.UNAUTHORIZED )    // 401
  create(@Body() createPokemonDto: CreatePokemonDto) {
    // return createPokemonDto            // en teoria tambien se puede aqui pero es mejor en el pokemon.service.ts
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    //console.log({ paginationDto })
    return this.pokemonService.findAll( paginationDto );
  }

  @Get(':id_term')
  findOne(@Param('id_term') id_term: string) {
    return this.pokemonService.findOne( id_term );
  }

  @Patch(':id_term')
  update(@Param('id_term') id_term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    // updatePokemonDto.       //heredan del CreatePokemonDto

    return this.pokemonService.update( id_term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove( id );
  }
}
