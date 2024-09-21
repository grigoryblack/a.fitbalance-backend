// src/config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseOnlineConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'dpg-crnamad6l47c73aceq4g-a',
    port: 5432,
    username: 'user',
    password: 'SaBBfBlWfqXjKVrI7AfWpdMNTtndCfUD',
    database: 'afitbalance',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
