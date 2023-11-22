export class CreateCalendarDto {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  userId: string;
}
