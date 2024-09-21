// src/config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'afitbalance',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
