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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./entities/client.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const calendar_service_1 = require("../calendar/calendar.service");
const mailer_1 = require("@nestjs-modules/mailer");
let ClientService = class ClientService {
    constructor(clientModel, calendarService, mailerService) {
        this.clientModel = clientModel;
        this.calendarService = calendarService;
        this.mailerService = mailerService;
    }
    async requestAppointmentMail(email, name) {
        this.mailerService.sendMail({
            to: email,
            from: 'provedev26@gmail.com',
            subject: 'Richiesta appuntamento',
            html: '<b>Grazie ' +
                name +
                ' per aver prenotato un appuntamento con noi.\nLa contatteremo presto!</b>',
        });
    }
    async confirmAppointmentMail(email, name) {
        this.mailerService.sendMail({
            to: email,
            from: 'provedev26@gmail.com',
            subject: 'Appuntamento confermato',
            html: '<b>Grazie ' + name + '.\nAbbiamo confermato il suo appuntamento</b>',
        });
    }
    async rejectAppointmentMail(email, name) {
        this.mailerService.sendMail({
            to: email,
            from: 'provedev26@gmail.com',
            subject: 'Appuntamento rifiutato',
            html: '<b>Ci dispiace ' +
                name +
                '.\nPurtroppo il suo appuntamento è stato riutato.</b>',
        });
    }
    async create(createClientDto) {
        const daySelected = await this.calendarService.findOneByDateClient(createClientDto.prenotation);
        const clientDaySelected = await this.clientModel
            .findOne({
            prenotation: createClientDto.prenotation,
        })
            .exec();
        if (daySelected) {
            throw new common_1.BadRequestException('This day is already booked');
        }
        else if (clientDaySelected) {
            throw new common_1.BadRequestException('This day is already booked');
        }
        else {
            await this.requestAppointmentMail(createClientDto.email, createClientDto.name);
            const createdClient = new this.clientModel(createClientDto);
            return await createdClient.save();
        }
    }
    async findAllCalendarEvents(id) {
        return await this.calendarService.findAllNoId(id);
    }
    async findAllClientEvents(id) {
        const dateNow = new Date();
        return await this.clientModel
            .find({ doctorSelected: id, prenotation: { $gt: dateNow } })
            .exec();
    }
    async findAllClient() {
        return await this.clientModel.find().exec();
    }
    async findAllNotConfirmed() {
        const dateNow = new Date();
        return await this.clientModel
            .find({ isConfirmed: null, prenotation: { $gt: dateNow } })
            .exec();
    }
    async findAllConfirmed() {
        const dateNow = new Date();
        return await this.clientModel
            .find({ isConfirmed: true, prenotation: { $gt: dateNow } })
            .exec();
    }
    findAllById(id) {
        return this.clientModel.find({ id: id }).exec();
    }
    update(id, updateClientDto) {
        return this.clientModel.updateOne({ _id: id }, updateClientDto);
    }
    updateIsConfirmed(id, updateClientDto) {
        const date = new Date(updateClientDto.prenotation);
        date.setMinutes(date.getMinutes() + 30);
        this.confirmAppointmentMail(updateClientDto.email, updateClientDto.name);
        this.calendarService.create({
            title: updateClientDto.name,
            start: updateClientDto.prenotation,
            end: date,
            allDay: false,
            userId: updateClientDto.doctorSelected,
        });
        return this.clientModel.updateOne({ _id: id }, { $set: { isConfirmed: true } });
    }
    updateRejected(id, updateClientDto) {
        this.rejectAppointmentMail(updateClientDto.email, updateClientDto.name);
        return this.clientModel.updateOne({ _id: id }, { $set: { isConfirmed: false } });
    }
    remove(id) {
        return this.clientModel.deleteOne({ _id: id }).exec();
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_entity_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        calendar_service_1.CalendarService,
        mailer_1.MailerService])
], ClientService);
//# sourceMappingURL=client.service.js.map