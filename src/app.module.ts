import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import {UserModule} from "./users/users.module";
import { AuthModule } from './auth/AuthLogic/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
