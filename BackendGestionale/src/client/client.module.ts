import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { CalendarModule } from 'src/calendar/calendar.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: true,
        auth: { user: 'provedev26@gmail.com', pass: 'kdgradnwrtkmafww' },
      },
    }),
    CalendarModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
