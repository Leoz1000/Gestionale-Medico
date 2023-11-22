/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarDocument = Calendar & Document;

enum IsCame {
  yes = 1,
  no = 2,
  notConfirmed = 0,
}

@Schema()
export class Calendar {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true })
  allDay: boolean;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 'notClient' })
  clientId: string;

  @Prop({ required: true, default: '#3788d8' }) //"#3788d8" '#378006'
  backgroundColor: string;

  @Prop({ required: true, default: '#3788d8' }) //"#3788d8" '#378006'
  borderColor: string;

  @Prop({ default: IsCame.notConfirmed })
  isCame: IsCame;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
