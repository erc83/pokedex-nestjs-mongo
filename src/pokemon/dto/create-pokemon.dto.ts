import { IsString, IsPositive, Min, IsInt, MinLength  } from 'class-validator'


export class CreatePokemonDto {

    @IsInt()
    @Min(1)
    @IsPositive()
    num: number

    @IsString()
    @MinLength(1)
    name: string

}
