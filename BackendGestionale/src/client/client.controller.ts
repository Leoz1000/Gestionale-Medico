import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/create')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.clientService.findAllClient();
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Get('/notConfirmed')
  async findAllClientNotConfirmed() {
    return await this.clientService.findAllNotConfirmed();
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Get('/confirmed')
  async findAllClientConfirmed() {
    return await this.clientService.findAllConfirmed();
  }

  @Throttle({})
  @Post('/bookedEvents')
  async findAllBookedEvents(@Body() body: any) {
    const eventsCalendar = await this.clientService.findAllCalendarEvents(
      body.id,
    );
    const eventsClient = await this.clientService.findAllClientEvents(body.id);
    //Filter events calendar
    const filteredCalendarEvent = eventsCalendar.map((event) => {
      return { date: event.start };
    });
    //Filter events client
    const filteredClientEvent = eventsClient.map((event) => {
      return { date: event.prenotation };
    });
    //Return the events
    const concatenedEvent = filteredCalendarEvent.concat(filteredClientEvent);
    return { concatenedEvent };
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findAllById(@Param('id') id: string) {
    return this.clientService.findAllById(id);
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Patch('/confirmed/:id')
  updateIsConfirmed(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateIsConfirmed(id, updateClientDto);
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Patch('/rejected/:id')
  updateRejected(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateRejected(id, updateClientDto);
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
