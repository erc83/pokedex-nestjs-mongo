import { Module } from '@nestjs/common';
import { AxiosAdapter } from './http-adapters/axios.adapter';

@Module({
    providers: [ AxiosAdapter ],         // aqui es el que estamos creamos nosotros
    exports: [ AxiosAdapter ]           // para utilizar fuera del modulo
})
export class CommonModule {}
