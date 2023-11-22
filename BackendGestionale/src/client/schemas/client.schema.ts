/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  doctorSelected: string;

  @Prop({})
  isConfirmed: boolean;

  @Prop({ required: true, unique: true })
  prenotation: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
