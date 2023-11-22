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
exports.CalendarController = void 0;
const common_1 = require("@nestjs/common");
const calendar_service_1 = require("./calendar.service");
const create_calendar_dto_1 = require("./dto/create-calendar.dto");
const update_calendar_dto_1 = require("./dto/update-calendar.dto");
const throttler_1 = require("@nestjs/throttler");
let CalendarController = class CalendarController {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    create(createCalendarDto) {
        return this.calendarService.create(createCalendarDto);
    }
    findAllCalendarClient(id) {
        return this.calendarService.findAllByClient(id);
    }
    findAllCalendar(id) {
        return this.calendarService.findAll(id);
    }
    remove(id) {
        return this.calendarService.remove(id);
    }
    update(id, updateCalendarDto) {
        return this.calendarService.update(id, updateCalendarDto);
    }
};
exports.CalendarController = CalendarController;
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_calendar_dto_1.CreateCalendarDto]),
    __metadata("design:returntype", void 0)
], CalendarController.prototype, "create", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.Get)('client/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CalendarController.prototype, "findAllCalendarClient", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CalendarController.prototype, "findAllCalendar", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CalendarController.prototype, "remove", null);
__decorate([
    (0, throttler_1.Throttle)({}),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_calendar_dto_1.UpdateCalendarDto]),
    __metadata("design:returntype", void 0)
], CalendarController.prototype, "update", null);
exports.CalendarController = CalendarController = __decorate([
    (0, common_1.Controller)('calendar'),
    __metadata("design:paramtypes", [calendar_service_1.CalendarService])
], CalendarController);
//# sourceMappingURL=calendar.controller.js.map