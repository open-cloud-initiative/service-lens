import { Design } from '@/db/models/design'
import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'

const env = process.env.NODE_ENV || 'development'

const models = [Design]

export interface Config {
    [index: string]: SequelizeOptions
}

export const config: Config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialectModule: require('pg'),
        dialect: 'postgres',
        models,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialectModule: require('pg'),
        dialect: 'postgres',
        logging: false,
        models,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectModule: require('pg'),
        models,
    },
}

const connection = new Sequelize({ ...config[env] })

export { Sequelize }
export default connection
