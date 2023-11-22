import { Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { Calendar, CalendarDocument } from './schemas/calendar.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name) private calendarModel: Model<CalendarDocument>,
  ) {}

  async create(
    createCalendarDto: CreateCalendarDto,
  ): Promise<CalendarDocument> {
    const createdCalendar = new this.calendarModel(createCalendarDto);
    return createdCalendar.save();
  }

  async findAllByClient(id: string): Promise<CalendarDocument[]> {
    return this.calendarModel.find({ clientId: id }).exec();
  }

  async findOneByDateClient(clientDate: Date): Promise<CalendarDocument> {
    return this.calendarModel.findOne({ start: clientDate }).exec();
  }

  async findAll(id: string): Promise<CalendarDocument[]> {
    return this.calendarModel.find({ userId: id }).exec();
  }

  async findAllNoId(id: string): Promise<CalendarDocument[]> {
    const dateNow = new Date();

    return this.calendarModel
      .find({ userId: id, start: { $gt: dateNow } })
      .exec();
  }

  async update(
    id: string,
    updateCalendarDto: UpdateCalendarDto,
  ): Promise<CalendarDocument> {
    return this.calendarModel
      .findByIdAndUpdate(id, updateCalendarDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CalendarDocument> {
    return this.calendarModel.findByIdAndDelete(id).exec();
  }
}
