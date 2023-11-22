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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const accessToken_guard_1 = require("../common/guards/accessToken.guard");
const role_guard_1 = require("../common/guards/role.guard");
const roleControll_guard_1 = require("../common/guards/roleControll.guard");
const throttler_1 = require("@nestjs/throttler");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAllDoctor() {
        const users = await this.usersService.findAllDoctor();
        const filteredUser = users.map((user) => {
            return { _id: user._id, name: user.name };
        });
        return filteredUser;
    }
    async findAll(Body) {
        const users = this.usersService.findAll();
        const filteredUser = [null];
        (await users).forEach((user) => {
            if (user._id != Body.sub) {
                const ele = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                    email: user.email,
                    phone: user.phone,
                };
                if (filteredUser[0] == null)
                    filteredUser[0] = ele;
                else
                    filteredUser.push(ele);
            }
        });
        return filteredUser;
    }
    findById(id) {
        return this.usersService.findById(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id, role) {
        if (role == 'doctor' &&
            (await this.usersService.findById(id)).role !== 'admin')
            return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, role_guard_1.Roles)('admin', 'doctor'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roleControll_guard_1.RoleGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.Get)('/doctors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllDoctor", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, role_guard_1.Roles)('admin', 'doctor', 'secretary'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roleControll_guard_1.RoleGuard),
    (0, common_1.Post)('/all'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, role_guard_1.Roles)('admin', 'doctor', 'secretary'),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roleControll_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findById", null);
__decorate([
    (0, role_guard_1.Roles)('admin', 'doctor'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roleControll_guard_1.RoleGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, role_guard_1.Roles)('admin', 'doctor'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roleControll_guard_1.RoleGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map