import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../../entity/users.entity';
import * as bcrypt from 'bcryptjs';
import { adminConfig } from "../../config/admin.config";
import { JwtStrategy } from "../JWT/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),  // Добавьте это
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    const adminExists = await this.authService.validateUser(adminConfig.email);
    if (!adminExists) {
      await this.authService.register(adminConfig.email, adminConfig.password, adminConfig.role);
      console.log(`Администратор создан с email: ${adminConfig.email}`);
    }
  }
}
