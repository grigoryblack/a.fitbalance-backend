import {IsBoolean, IsEmail, IsString, Length} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'user' })
    @IsString()
    role: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @Length(6, 20)
    password: string;
}
