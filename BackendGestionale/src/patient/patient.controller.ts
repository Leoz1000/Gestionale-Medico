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
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  //ANAMNESIS
  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Post('anamnesi/:id')
  addAnamnesi(
    @Param('id') id: string,
    @Body() data: { anamnesi: string; prenotation: Date },
  ) {
    return (
      this.patientService.addAnamnesis(id, data.anamnesi),
      this.patientService.addPrenotation(id, data.prenotation)
    );
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Post('anamnesi/delete/:id')
  removeAnamnesi(
    @Param('id') id: string,
    @Body() data: { anamnesi: string; prenotation: Date },
  ) {
    return (
      this.patientService.removeAnamnesis(id, data.anamnesi),
      this.patientService.removePrenotation(id, data.prenotation)
    );
  }

  //
  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Throttle({})
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
