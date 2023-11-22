import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const createdClient = new this.patientModel(createPatientDto);
    return await createdClient.save();
  }

  async findAll() {
    return await this.patientModel.find().exec();
  }

  async findOne(id: string) {
    return await this.patientModel.findById(id).exec();
  }

  //ADD ANAMNESIS TO PATIENT
  async addAnamnesis(id: string, anamnesis: string) {
    return this.patientModel
      .findByIdAndUpdate(id, { $push: { anamnesis: anamnesis } })
      .exec();
  }

  //REMOVE ANAMNESIS TO PATIENT
  async removeAnamnesis(id: string, anamnesis: string) {
    return this.patientModel
      .findByIdAndUpdate(id, { $pull: { anamnesis: anamnesis } })
      .exec();
  }

  //ADD PRENOTATION TO PATIENT
  async addPrenotation(id: string, prenotation: Date) {
    return this.patientModel
      .findByIdAndUpdate(id, { $push: { prenotations: prenotation } })
      .exec();
  }

  //REMOVE PRENOTATION TO PATIENT
  async removePrenotation(id: string, prenotation: Date) {
    return this.patientModel
      .findByIdAndUpdate(id, { $pull: { prenotations: prenotation } })
      .exec();
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    if (updatePatientDto.anamnesis && updatePatientDto.prenotations) {
      return await this.patientModel
        .findByIdAndUpdate(id, updatePatientDto, { new: true })
        .exec();
    }
    if (updatePatientDto.doctorSelected === '') {
      return await this.patientModel
        .findByIdAndUpdate(
          id,
          {
            name: updatePatientDto.name,
            email: updatePatientDto.email,
            fiscalCode: updatePatientDto.fiscalCode,
            phone: updatePatientDto.phone,
          },
          { new: true },
        )
        .exec();
    } else {
      return await this.patientModel
        .findByIdAndUpdate(id, updatePatientDto, { new: true })
        .exec();
    }
  }

  async remove(id: string) {
    return await this.patientModel.findByIdAndRemove(id).exec();
  }
}
