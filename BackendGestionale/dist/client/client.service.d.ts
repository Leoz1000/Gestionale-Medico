/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientDocument } from './schemas/client.schema';
import { Model } from 'mongoose';
import { CalendarService } from 'src/calendar/calendar.service';
import { MailerService } from '@nestjs-modules/mailer';
import { DeleteResult } from 'mongodb';
export declare class ClientService {
    private clientModel;
    private calendarService;
    private mailerService;
    constructor(clientModel: Model<ClientDocument>, calendarService: CalendarService, mailerService: MailerService);
    requestAppointmentMail(email: string, name: string): Promise<void>;
    confirmAppointmentMail(email: string, name: string): Promise<void>;
    rejectAppointmentMail(email: string, name: string): Promise<void>;
    create(createClientDto: CreateClientDto): Promise<ClientDocument>;
    findAllCalendarEvents(id: string): Promise<import("../calendar/schemas/calendar.schema").CalendarDocument[]>;
    findAllClientEvents(id: string): Promise<(import("mongoose").Document<unknown, {}, ClientDocument> & import("./schemas/client.schema").Client & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAllClient(): Promise<ClientDocument[]>;
    findAllNotConfirmed(): Promise<ClientDocument[]>;
    findAllConfirmed(): Promise<ClientDocument[]>;
    findAllById(id: string): Promise<ClientDocument[]>;
    update(id: string, updateClientDto: UpdateClientDto): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, ClientDocument> & import("./schemas/client.schema").Client & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, ClientDocument, "updateOne">;
    updateIsConfirmed(id: string, updateClientDto: UpdateClientDto): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, ClientDocument> & import("./schemas/client.schema").Client & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, ClientDocument, "updateOne">;
    updateRejected(id: string, updateClientDto: UpdateClientDto): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, ClientDocument> & import("./schemas/client.schema").Client & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, ClientDocument, "updateOne">;
    remove(id: string): Promise<DeleteResult>;
}
