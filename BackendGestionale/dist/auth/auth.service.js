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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(createUserDto) {
        const userExists = await this.usersService.findByUsername(createUserDto.username);
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser._id, newUser.username, newUser.name, newUser.role);
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
        return tokens;
    }
    async signIn(data) {
        const user = await this.usersService.findByUsername(data.username);
        if (!user)
            throw new common_1.BadRequestException('User or password is incorrect');
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('User or password is incorrect');
        const tokens = await this.getTokens(user._id, user.username, user.name, user.role);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        return this.usersService.update(userId, { refreshToken: null });
    }
    hashData(data) {
        return argon2.hash(data);
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.updateRefreshToken(userId, {
            refreshToken: hashedRefreshToken,
        });
    }
    async getTokens(userId, username, name, role) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username,
                name,
                role: role,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '30m',
            }),
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.username, user.name, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map