import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Throttle({})
  @Post()
  create(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.create(createCalendarDto);
  }

  @Throttle({})
  @Get('client/:id')
  findAllCalendarClient(@Param('id') id: string) {
    return this.calendarService.findAllByClient(id);
  }

  @Throttle({})
  @Get(':id')
  findAllCalendar(@Param('id') id: string) {
    return this.calendarService.findAll(id);
  }

  @Throttle({})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.calendarService.findOne(+id);
  // }

  @Throttle({})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalendarDto: UpdateCalendarDto,
  ) {
    return this.calendarService.update(id, updateCalendarDto);
  }
}
