
// envoltorio de mi codigo que me ayuda a que si axios cambia solo se afecte aqui
// y solo tengamos que cambiar en esta clase 
import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { HttpAdapter } from '../interfaces/http-adapter.interface'


@Injectable()           // instruccion para injectarlo en nuestro servicio tenemos que decorarlo
export class AxiosAdapter implements HttpAdapter{                   // ctrl + .  en AxiosAdapter
    
    private axios: AxiosInstance = axios                // no readonly para modificacion
    
    
    async get<T>(url: string): Promise<T> {
        //throw new Error("Method not implemented.");
        try {
            // const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')    
            const { data } = await this.axios.get<T>( url )    

            return data

        } catch (error) {
            throw new Error('This is an error - Check logs')
        }
    }

}


// hay que considerar que los provider a diferencia de otros framework que tambien trabajan con injectables
// estos estan a nivel de modulo, si necesito que el AxiosAdapter sea visible por otros modulos
// tengo que exportarlo e importarlo

