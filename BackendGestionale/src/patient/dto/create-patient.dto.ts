export class CreatePatientDto {
  name: string;
  fiscalCode: string;
  email: string;
  phone: string;
  doctorSelected: string;
  anamnesis: string[];
  prenotations: Date[];
}
