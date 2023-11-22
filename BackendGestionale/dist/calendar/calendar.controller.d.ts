import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
export declare class CalendarController {
    private readonly calendarService;
    constructor(calendarService: CalendarService);
    create(createCalendarDto: CreateCalendarDto): Promise<import("./schemas/calendar.schema").CalendarDocument>;
    findAllCalendarClient(id: string): Promise<import("./schemas/calendar.schema").CalendarDocument[]>;
    findAllCalendar(id: string): Promise<import("./schemas/calendar.schema").CalendarDocument[]>;
    remove(id: string): Promise<import("./schemas/calendar.schema").CalendarDocument>;
    update(id: string, updateCalendarDto: UpdateCalendarDto): Promise<import("./schemas/calendar.schema").CalendarDocument>;
}
