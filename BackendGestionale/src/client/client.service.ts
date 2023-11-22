import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientDocument } from './schemas/client.schema';
import { Client } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalendarService } from 'src/calendar/calendar.service';
import { MailerService } from '@nestjs-modules/mailer';
import { DeleteResult } from 'mongodb';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private calendarService: CalendarService,
    private mailerService: MailerService,
  ) {}

  //EMAIL
  async requestAppointmentMail(email: string, name: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'provedev26@gmail.com',
      subject: 'Richiesta appuntamento',
      html:
        '<b>Grazie ' +
        name +
        ' per aver prenotato un appuntamento con noi.\nLa contatteremo presto!</b>',
    });
  }
  async confirmAppointmentMail(email: string, name: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'provedev26@gmail.com',
      subject: 'Appuntamento confermato',
      html:
        '<b>Grazie ' + name + '.\nAbbiamo confermato il suo appuntamento</b>',
    });
  }
  async rejectAppointmentMail(email: string, name: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'provedev26@gmail.com',
      subject: 'Appuntamento rifiutato',
      html:
        '<b>Ci dispiace ' +
        name +
        '.\nPurtroppo il suo appuntamento è stato riutato.</b>',
    });
  }
  //END EMAIL
  //-----------------------------------------------------------------------------
  //FUNCTION CLIENT
  async create(createClientDto: CreateClientDto): Promise<ClientDocument> {
    const daySelected = await this.calendarService.findOneByDateClient(
      createClientDto.prenotation,
    );
    const clientDaySelected = await this.clientModel
      .findOne({
        prenotation: createClientDto.prenotation,
      })
      .exec();
    if (daySelected) {
      throw new BadRequestException('This day is already booked');
    } else if (clientDaySelected) {
      throw new BadRequestException('This day is already booked');
    } else {
      await this.requestAppointmentMail(
        createClientDto.email,
        createClientDto.name,
      );
      const createdClient = new this.clientModel(createClientDto);
      return await createdClient.save();
    }
  }

  async findAllCalendarEvents(id: string) {
    return await this.calendarService.findAllNoId(id);
  }
  async findAllClientEvents(id: string) {
    const dateNow = new Date();

    return await this.clientModel
      .find({ doctorSelected: id, prenotation: { $gt: dateNow } })
      .exec();
  }
  //CERCA TUTTI I CLIENTI
  async findAllClient(): Promise<ClientDocument[]> {
    return await this.clientModel.find().exec();
  }

  //CERCA TUTTI I CLIENTI SENZA CONFERMA
  async findAllNotConfirmed(): Promise<ClientDocument[]> {
    const dateNow = new Date();
    return await this.clientModel
      .find({ isConfirmed: null, prenotation: { $gt: dateNow } })
      .exec();
  }

  //CERCA TUTTI I CLIENTI CONFERMATI
  async findAllConfirmed(): Promise<ClientDocument[]> {
    const dateNow = new Date();
    return await this.clientModel
      .find({ isConfirmed: true, prenotation: { $gt: dateNow } })
      .exec();
  }

  //CERCA UN CLIENTE TRAMITE ID
  findAllById(id: string): Promise<ClientDocument[]> {
    return this.clientModel.find({ id: id }).exec();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.updateOne({ _id: id }, updateClientDto);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateIsConfirmed(id: string, updateClientDto: UpdateClientDto) {
    const date = new Date(updateClientDto.prenotation);
    date.setMinutes(date.getMinutes() + 30);

    this.confirmAppointmentMail(updateClientDto.email, updateClientDto.name);
    this.calendarService.create({
      title: updateClientDto.name,
      start: updateClientDto.prenotation,
      end: date,
      allDay: false,
      userId: updateClientDto.doctorSelected,
    });

    return this.clientModel.updateOne(
      { _id: id },
      { $set: { isConfirmed: true } },
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRejected(id: string, updateClientDto: UpdateClientDto) {
    this.rejectAppointmentMail(updateClientDto.email, updateClientDto.name);
    return this.clientModel.updateOne(
      { _id: id },
      { $set: { isConfirmed: false } },
    );
  }

  remove(id: string): Promise<DeleteResult> {
    return this.clientModel.deleteOne({ _id: id }).exec();
  }
}
