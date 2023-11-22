import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, CalendarSchema } from './schemas/calendar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calendar.name, schema: CalendarSchema },
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
