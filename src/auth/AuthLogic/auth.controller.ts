import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '../CreateUserDto/register.dto';
import { LoginDto } from '../CreateUserDto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({
        description: 'User registration data',
        type: RegisterDto,
    })
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.email, body.password, body.role);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully.' })
    @ApiResponse({ status: 400, description: 'Пользователь не найден' })
    @ApiResponse({ status: 401, description: 'Введен неправильный пароль' })
    @ApiBody({
        description: 'User login data',
        type: LoginDto,
    })
    async login(@Body() body: LoginDto) {
        return this.authService.login(body.email, body.password);
    }
}
