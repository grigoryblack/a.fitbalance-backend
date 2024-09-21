import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'Уникальный идентификатор пользователя',
        example: uuidv4(),
    })
    id: string;

    @Column({ type: 'varchar', length: 50 })
    @ApiProperty({
        description: 'Роль пользователя',
        example: 'admin',
    })
    @IsString()
    role: string;

    @Column({ type: 'boolean', default: false })
    @ApiProperty({
        description: 'Роль пользователя',
        example: 'admin',
    })
    @IsString()
    isConfirmed: boolean;

    @Column({ type: 'boolean', default: false })
    @ApiProperty({
        description: 'Флаг блокировки пользователя',
        example: false,
    })
    @IsBoolean()
    banned: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    @ApiPropertyOptional({
        description: 'Имя пользователя',
        example: 'Иван',
    })
    @IsString()
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    @ApiPropertyOptional({
        description: 'Фамилия пользователя',
        example: 'Иванов',
    })
    @IsString()
    surname: string;

    @Column({ type: 'varchar', unique: true, length: 150 })
    @ApiProperty({
        description: 'Электронная почта пользователя',
        example: 'ivan.ivanov@example.com',
    })
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    @ApiPropertyOptional({
        description: 'Телефонный номер пользователя',
        example: '+79001234567',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({
        description: 'Дата и время создания пользователя',
        example: new Date().toISOString(),
    })
    createdAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    @ApiProperty({
        description: 'Дата и время удаления пользователя',
        example: null,
        nullable: true,
    })
    @IsOptional()
    deletedAt?: Date;
}
