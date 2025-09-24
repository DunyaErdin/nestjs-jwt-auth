import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        this.logger.log(`Login request received: ${JSON.stringify(loginDto)}`);

        // Debug için loginDto'yu kontrol edin
        if (!loginDto) {
            this.logger.error('LoginDto is undefined');
            throw new Error('Request body is required');
        }

        return this.authService.login(loginDto);
    }
}