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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto): Promise<import("./schemas/client.schema").ClientDocument>;
    findAll(): Promise<import("./schemas/client.schema").ClientDocument[]>;
    findAllClientNotConfirmed(): Promise<import("./schemas/client.schema").ClientDocument[]>;
    findAllClientConfirmed(): Promise<import("./schemas/client.schema").ClientDocument[]>;
    findAllBookedEvents(body: any): Promise<{
        concatenedEvent: {
            date: Date;
        }[];
    }>;
    findAllById(id: string): Promise<import("./schemas/client.schema").ClientDocument[]>;
    update(id: string, updateClientDto: UpdateClientDto): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("./schemas/client.schema").ClientDocument> & import("./schemas/client.schema").Client & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schemas/client.schema").ClientDocument, "updateOne">;
    updateIsConfirmed(id: string, updateClientDto: UpdateClientDto): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("./schemas/client.schema").ClientDocument> & import("./schemas/client.schema").Client & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schemas/client.schema").ClientDocument, "updateOne">;
    updateRejected(id: string, updateClientDto: UpdateClientDto): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("./schemas/client.schema").ClientDocument> & import("./schemas/client.schema").Client & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schemas/client.schema").ClientDocument, "updateOne">;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
