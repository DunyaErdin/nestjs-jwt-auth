import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async login(loginDto: LoginDto) {
        try {
            this.logger.log(`Login attempt for email: ${loginDto?.email}`);

            // loginDto null/undefined kontrolü
            if (!loginDto) {
                throw new UnauthorizedException('Login data is required');
            }

            if (!loginDto.email || !loginDto.password) {
                throw new UnauthorizedException('Email and password are required');
            }
            const user = await this.prisma.user.findUnique(
                { where: { email: loginDto.email } }
            )

            // Mock user validation (gerçek uygulamada database'den kontrol edin)
            if (!user) {
                throw new UnauthorizedException("Invalid credentials")
            }

            const payload = { email: user.email, sub: user.id };
            const token = this.jwtService.sign(payload);

            this.logger.log(`Token generated successfully for: ${loginDto.email}`);

            return {
                access_token: token,
                user: {
                    id: user.id,
                    email: user.email
                }
            };


        } catch (error) {
            this.logger.error(`Login error: ${error.message}`, error.stack);
            throw error;
        }
    }
}