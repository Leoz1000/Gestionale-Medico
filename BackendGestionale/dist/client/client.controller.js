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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const update_client_dto_1 = require("./dto/update-client.dto");
const accessToken_guard_1 = require("../common/guards/accessToken.guard");
const throttler_1 = require("@nestjs/throttler");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    create(createClientDto) {
        return this.clientService.create(createClientDto);
    }
    findAll() {
        return this.clientService.findAllClient();
    }
    async findAllClientNotConfirmed() {
        return await this.clientService.findAllNotConfirmed();
    }
    async findAllClientConfirmed() {
        return await this.clientService.findAllConfirmed();
    }
    async findAllBookedEvents(body) {
        const eventsCalendar = await this.clientService.findAllCalendarEvents(body.id);
        const eventsClient = await this.clientService.findAllClientEvents(body.id);
        const filteredCalendarEvent = eventsCalendar.map((event) => {
            return { date: event.start };
        });
        const filteredClientEvent = eventsClient.map((event) => {
            return { date: event.prenotation };
        });
        const concatenedEvent = filteredCalendarEvent.concat(filteredClientEvent);
        return { concatenedEvent };
    }
    findAllById(id) {
        return this.clientService.findAllById(id);
    }
    update(id, updateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }
    updateIsConfirmed(id, updateClientDto) {
        return this.clientService.updateIsConfirmed(id, updateClientDto);
    }
    updateRejected(id, updateClientDto) {
        return this.clientService.updateRejected(id, updateClientDto);
    }
    remove(id) {
        return this.clientService.remove(id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "create", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "findAll", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/notConfirmed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAllClientNotConfirmed", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/confirmed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAllClientConfirmed", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.Post)('/bookedEvents'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAllBookedEvents", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "findAllById", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "update", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/confirmed/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "updateIsConfirmed", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/rejected/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "updateRejected", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "remove", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map