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
    remove(id: string): Promise<CalendarDocument>;
}
