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
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { CalendarDocument } from './schemas/calendar.schema';
import { Model } from 'mongoose';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
export declare class CalendarService {
    private calendarModel;
    constructor(calendarModel: Model<CalendarDocument>);
    create(createCalendarDto: CreateCalendarDto): Promise<CalendarDocument>;
    findAllByClient(id: string): Promise<CalendarDocument[]>;
    findOneByDateClient(clientDate: Date): Promise<CalendarDocument>;
    findAll(id: string): Promise<CalendarDocument[]>;
    findAllNoId(id: string): Promise<CalendarDocument[]>;
    update(id: string, updateCalendarDto: UpdateCalendarDto): Promise<CalendarDocument>;
    remove(id: string): Promise<any>;
}
