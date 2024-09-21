import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {User} from "../../entity/users.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
    }

    async register(email: string, password: string, role: string): Promise<{ access_token: string, user: User }> {
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Пользователь с таким email уже существует');
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = this.usersRepository.create({
            email,
            password: hashedPassword,
            role,
            banned: false,
            isConfirmed: false,
        });

        const savedUser = await this.usersRepository.save(newUser);

        const payload = { email: savedUser.email, role: savedUser.role };
        const access_token = this.jwtService.sign(payload);

        return { access_token, user: savedUser };
    }

    async login(email: string, password: string): Promise<{ access_token: string, user: User }> {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException('Введен неправильный пароль');
        }

        const payload = { email: user.email, role: user.role };
        const access_token = this.jwtService.sign(payload);

        return { access_token, user };
    }


    async validateUser(email: string): Promise<User | null> {
        return this.usersRepository.findOne({where: {email}});
    }
}
