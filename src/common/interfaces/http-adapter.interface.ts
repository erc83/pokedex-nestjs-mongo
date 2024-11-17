

export interface HttpAdapter {
    get<T>( url: string ): Promise<T>       // tipo generico y regreso de tipo T
}