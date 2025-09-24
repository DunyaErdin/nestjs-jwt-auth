"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = AuthService_1 = class AuthService {
    jwtService;
    prisma;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async login(loginDto) {
        try {
            this.logger.log(`Login attempt for email: ${loginDto?.email}`);
            if (!loginDto) {
                throw new common_1.UnauthorizedException('Login data is required');
            }
            if (!loginDto.email || !loginDto.password) {
                throw new common_1.UnauthorizedException('Email and password are required');
            }
            const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
            if (!user) {
                throw new common_1.UnauthorizedException("Invalid credentials");
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
        }
        catch (error) {
            this.logger.error(`Login error: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map