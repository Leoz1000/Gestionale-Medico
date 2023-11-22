/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  fiscalCode: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  doctorSelected: string;

  @Prop({})
  anamnesis: string[];

  @Prop({ required: true })
  prenotations: Date[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
