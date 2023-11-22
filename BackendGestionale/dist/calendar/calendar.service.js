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
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const calendar_schema_1 = require("./schemas/calendar.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CalendarService = class CalendarService {
    constructor(calendarModel) {
        this.calendarModel = calendarModel;
    }
    async create(createCalendarDto) {
        const createdCalendar = new this.calendarModel(createCalendarDto);
        return createdCalendar.save();
    }
    async findAllByClient(id) {
        return this.calendarModel.find({ clientId: id }).exec();
    }
    async findOneByDateClient(clientDate) {
        return this.calendarModel.findOne({ start: clientDate }).exec();
    }
    async findAll(id) {
        return this.calendarModel.find({ userId: id }).exec();
    }
    async findAllNoId(id) {
        const dateNow = new Date();
        return this.calendarModel
            .find({ userId: id, start: { $gt: dateNow } })
            .exec();
    }
    async update(id, updateCalendarDto) {
        return this.calendarModel
            .findByIdAndUpdate(id, updateCalendarDto, { new: true })
            .exec();
    }
    async remove(id) {
        return this.calendarModel.findByIdAndDelete(id).exec();
    }
};
exports.CalendarService = CalendarService;
exports.CalendarService = CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(calendar_schema_1.Calendar.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CalendarService);
//# sourceMappingURL=calendar.service.js.map