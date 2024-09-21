import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from '../../entity/users.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiConflictResponse } from '@nestjs/swagger';
import {UserService} from "./users.service";
import {JwtAuthGuard} from "../../auth/JWT/jwt-auth.guard";

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Создать нового пользователя' })
    @ApiResponse({ status: 201, description: 'Создан пользователь', type: User })
    @ApiBadRequestResponse({ description: 'Некорректный запрос' })
    @ApiConflictResponse({ description: 'Пользователь с таким email уже существует' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, description: 'Список пользователей', type: [User] })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Получить пользователя по ID' })
    @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
    @ApiNotFoundResponse({ description: 'Пользователь не найден' })
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Обновить пользователя по ID' })
    @ApiResponse({ status: 200, description: 'Пользователь обновлен', type: User })
    @ApiNotFoundResponse({ description: 'Пользователь не найден' })
    @ApiBadRequestResponse({ description: 'Некорректный запрос' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Удалить пользователя по ID' })
    @ApiResponse({ status: 204, description: 'Пользователь помечен как удаленный' })
    @ApiNotFoundResponse({ description: 'Пользователь не найден' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.remove(id);
    }
}
