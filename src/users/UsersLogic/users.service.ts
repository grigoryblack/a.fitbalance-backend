import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (existingUser) {
            throw new ConflictException('Пользователь с таким email уже существует');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 5);

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            where: { deletedAt: null },
        });
    }

    async findOne(id: string): Promise<User> {
        try {
            return await this.userRepository.findOneOrFail({
                where: { id, deletedAt: null },
            });
        } catch (error) {
            throw new NotFoundException('Пользователь не найден');
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        Object.assign(user, updateUserDto);

        if (user.name && user.surname && user.phone) {
            user.isConfirmed = true;
        }

        return this.userRepository.save(user);
    }


    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        user.deletedAt = new Date();
        await this.userRepository.save(user);
    }
}
