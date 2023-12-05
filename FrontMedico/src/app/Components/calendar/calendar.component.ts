import {
  Component,
  signal,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import itLocale from '@fullcalendar/core/locales/it';
import { CalendarService } from '../../_services/calendar.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',

    //SET EVENT ON CALENDAR
    events: this.getAllEvents.bind(this), // alternatively, use the `events` setting to fetch from a feed

    views: {
      dayGridMonth: {
        // name of view
        titleFormat: { year: 'numeric', month: 'long' },
        // other view-specific options here
      },
    },
    eventTimeFormat: {
      // like '14:30'
      hour: '2-digit',
      minute: '2-digit',
      second: undefined,
      meridiem: true,
      hour12: false,
    },

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventDisplay: 'auto',
    handleWindowResize: true,
    businessHours: true,
    navLinks: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    //SET LANGUAGE CALENDAR
    locale: itLocale,

    //FUNCTION FOR ADD/UPDATE/DELETO ON DB
    eventAdd: this.handleEventAdd.bind(this),
    eventChange: this.handleEventChange.bind(this),
    eventRemove: this.handleEventRemove.bind(this),
  });

  //SET EVENTS
  currentEvents = signal<EventApi[]>([]);
  //SET USER
  user = this.storageService.getDecodedAccessToken();
  isDoctor: boolean = false;
  //GET ALL USER DOCTORS
  usersNotFiltered: any;
  users: any;

  //Subscription
  subscriptionDoctor: any;
  subscriptionGetApp: any;
  subscriptionAddApp: any;
  subscriptionEditApp: any;
  subscriptionDeleteApp: any;

  ngOnInit(): void {
    //Get ROLE USER
    this.isDoctor = this.user.role === 'secretary' ? false : true;
    this.subscriptionDoctor = this.userService
      .getUserAll()
      .subscribe((data: any) => {
        this.usersNotFiltered = data.map((e: any) => {
          if (e.role === 'doctor') {
            return {
              _id: e._id,
              name: e.name.replace(/\b(\w)/g, (s: any) => s.toUpperCase()),
              role: e.role,
            };
          }
          return;
        });
        this.users = this.usersNotFiltered.filter(
          (data: any) => data !== undefined
        );
      });
  }

  changes: boolean = true;
  //Function for update when change doctor selected
  Changes() {
    if (this.changes) {
      this.changes = false;
    } else {
      this.changes = true;
      setTimeout(() => {
        this.changes = false;
      }, 50);
    }
  }

  selectedValue = null;
  dotColor: string = '';
  //TAKE ALL EVENT FROM DB
  async getAllEvents(): Promise<EventInput[]> {
    if (this.isDoctor) {
      return new Promise<EventInput[]>((resolve) => {
        this.subscriptionGetApp = this.api
          .getAppointement(
            'https://angular-nest-auth-sandy.vercel.app/calendar/' +
              this.user.sub
          )
          .subscribe((data: any) => {
            //SET EVENTS_CLIENT_INFO

            //SAVE DATA FOR CALENDAR
            data.forEach((e: any) => {
              if (e.isCame == 1) {
                this.dotColor = '#378006';
                e.borderColor = '#378006';
                e.backgroundColor = '#378006';
              } else if (e.isCame == 2) {
                this.dotColor = '#ff6961';

                e.borderColor = '#ff6961';
                e.backgroundColor = '#ff6961';
              } else if (e.isCame == 0) {
                this.dotColor = '#3788d8';
                e.borderColor = '#3788d8';
                e.backgroundColor = '#3788d8';
              }
            });
            resolve(data);
          });
      });
    } else {
      return new Promise<EventInput[]>((resolve) => {
        this.subscriptionGetApp = this.api
          .getAppointement(
            'https://angular-nest-auth-sandy.vercel.app/calendar/' +
              this.selectedValue
          )
          .subscribe((data: any) => {
            //SET EVENTS_CLIENT_INFO

            //SAVE DATA FOR CALENDAR
            resolve(data);
          });
      });
    }
  }

  //CONSTRUCTOR
  constructor(
    private changeDetector: ChangeDetectorRef,
    private api: CalendarService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  //SAVE NEW EVENT ON DB
  handleEventAdd(args: any) {
    if (this.isDoctor) {
      this.subscriptionAddApp = this.api
        .setAppointement(
          'https://angular-nest-auth-sandy.vercel.app/calendar',
          {
            title: args.event.title,
            start: args.event.start,
            end: args.event.end,
            allDay: args.event.allDay,
            userId: this.user.sub,
          }
        )
        .subscribe((response) => {});
    } else {
      this.subscriptionAddApp = this.api
        .setAppointement(
          'https://angular-nest-auth-sandy.vercel.app/calendar',
          {
            title: args.event.title,
            start: args.event.start,
            end: args.event.end,
            allDay: args.event.allDay,
            userId: this.selectedValue,
          }
        )
        .subscribe((response) => {});
    }
  }
  //SAVE UPDATED EVENT ON DB
  handleEventChange(args: any) {
    if (this.isDoctor) {
      this.subscriptionEditApp = this.api
        .updateAppointement(
          'https://angular-nest-auth-sandy.vercel.app/calendar',
          args.event._def.extendedProps._id.toString(),
          {
            title: args.event.title,
            start: args.event.start,
            end: args.event.end,
            allDay: args.event.allDay,
            userId: this.user.sub,
          }
        )
        .subscribe((response) => {});
    } else {
      this.subscriptionEditApp = this.api
        .updateAppointement(
          'https://angular-nest-auth-sandy.vercel.app/calendar',
          args.event._def.extendedProps._id.toString(),
          {
            title: args.event.title,
            start: args.event.start,
            end: args.event.end,
            allDay: args.event.allDay,
            userId: this.selectedValue,
          }
        )
        .subscribe((response) => {});
    }
  }
  // REMOVE EVENT ON DB
  handleEventRemove(args: any) {
    this.subscriptionDeleteApp = this.api
      .removeAppointement(
        'https://angular-nest-auth-sandy.vercel.app/calendar',
        args.event._def.extendedProps._id.toString()
      )
      .subscribe((response) => {});
  }

  //REMOVE WEEKENDS
  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  selectedInfo: any;
  //Selected Date
  handleDateSelect(selectInfo: DateSelectArg) {
    this.showModal();
    this.selectedInfo = selectInfo;
  }

  eventClicked: any;
  //Event Clicked and show modal remove
  handleEventClick(clickInfo: EventClickArg) {
    this.showModalRemove();
    this.eventClicked = clickInfo.event;
  }

  //ADD NEW EVENT
  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // work around for pressionChangedAfterItHasBeenCheckedError
  }

  //MODAL
  isVisible = false;
  isVisibleRemove = false;
  isOkLoading = false;
  isOkLoadingRemove = false;

  showModal(): void {
    this.isVisible = true;
  }

  //ADD EVENT
  value?: string;
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
    const titleText = this.value;
    const title = titleText;
    const calendarApi = this.selectedInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: this.selectedInfo.startStr,
        end: this.selectedInfo.endStr,
        allDay: this.selectedInfo.allDay,
      });
    }
    this.Changes();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  //MODAL REMOVE
  showModalRemove(): void {
    this.isVisibleRemove = true;
  }

  handleOkRemove(): void {
    this.isOkLoadingRemove = true;
    setTimeout(() => {
      this.isVisibleRemove = false;
      this.isOkLoadingRemove = false;
    }, 1000);
    this.eventClicked.remove();
  }

  handleCancelRemove(): void {
    this.isVisibleRemove = false;
  }

  ngOnDestroy(): void {
    if (this.subscriptionDoctor != null) this.subscriptionDoctor.unsubscribe();
    if (this.subscriptionGetApp != null) this.subscriptionGetApp.unsubscribe();
    if (this.subscriptionAddApp != null) this.subscriptionAddApp.unsubscribe();
    if (this.subscriptionEditApp != null)
      this.subscriptionEditApp.unsubscribe();
    if (this.subscriptionDeleteApp != null)
      this.subscriptionDeleteApp.unsubscribe();
  }
}
