import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import {UserModule} from "./users/users.module";
import { AuthModule } from './auth/AuthLogic/auth.module';
import {ConfigModule} from "@nestjs/config";
import {databaseOnlineConfig} from "./config/databaseOnline.config";

@Module({
  imports: [
    /*TypeOrmModule.forRoot(databaseConfig),*/
    TypeOrmModule.forRoot(databaseOnlineConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
