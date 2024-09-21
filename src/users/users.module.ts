import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../entity/users.entity";
import {UserService} from "./UsersLogic/users.service";
import {UserController} from "./UsersLogic/users.controller";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
