import {IsString, IsEmail, IsBoolean, IsOptional, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Роль пользователя',
        example: 'admin',
    })
    @IsString()
    role: string;

    @ApiProperty({
        description: 'Флаг блокировки пользователя',
        example: false,
    })
    @IsBoolean()
    banned: boolean;

    @ApiProperty({
        description: 'Имя пользователя',
        example: 'Иван',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Фамилия пользователя',
        example: 'Иванов',
    })
    @IsString()
    surname: string;

    @ApiProperty({
        description: 'Электронная почта пользователя',
        example: 'ivan.ivanov@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        example: 'strongpassword123',
    })
    @IsString()
    @MinLength(6) // Минимальная длина пароля
    password: string;

    @ApiProperty({
        description: 'Телефонный номер пользователя',
        example: '+79001234567',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    phone?: string;
}

export class UpdateUserDto {
    @ApiProperty({
        description: 'Роль пользователя',
        example: 'user',
        required: false,
    })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiProperty({
        description: 'Флаг блокировки пользователя',
        example: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    banned?: boolean;

    @ApiProperty({
        description: 'Имя пользователя',
        example: 'Иван',
        required: false,
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'Фамилия пользователя',
        example: 'Иванов',
        required: false,
    })
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiProperty({
        description: 'Электронная почта пользователя',
        example: 'ivan.ivanov@example.com',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'Телефонный номер пользователя',
        example: '+79001234567',
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;
}
