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
import { Document } from 'mongoose';
export type CalendarDocument = Calendar & Document;
declare enum IsCame {
    yes = 1,
    no = 2,
    notConfirmed = 0
}
export declare class Calendar {
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    userId: string;
    clientId: string;
    backgroundColor: string;
    borderColor: string;
    isCame: IsCame;
}
export declare const CalendarSchema: import("mongoose").Schema<Calendar, import("mongoose").Model<Calendar, any, any, any, Document<unknown, any, Calendar> & Calendar & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Calendar, Document<unknown, {}, Calendar> & Calendar & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};
