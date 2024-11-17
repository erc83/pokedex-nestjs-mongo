// se puede llamar tambien app.config.ts

// return implicito de mapeo de variables de entorno a un objeto
export const envConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',             // en caso que no este sera desarrollo
    mongodb: process.env.MONGO_DB, 
    port: process.env.PORT || 3001, 
    defaultLimit: process.env.DEFAULT_LIMIT || 7, 
})

