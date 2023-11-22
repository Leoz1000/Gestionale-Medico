import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { UserService } from 'src/app/_services/user.service';

interface ItemClient {
  _id: string;
  name: string;
  email: number;
  phone: string;
  doctorSelected: string;
  doctorName: string;
  isConfirmed: boolean;
  prenotation: Date;
}

@Component({
  selector: 'app-request-patient',
  templateUrl: './request-patient.component.html',
  styleUrls: ['./request-patient.component.css'],
})
export class RequestPatientComponent implements OnInit, OnDestroy {
  listOfClient: ItemClient[] = [];
  listOfDisplayData = [...this.listOfClient];

  //Search Variables
  searchValue = '';
  visible = false;

  //Doctors
  doctors: any;

  //Users
  usersNotFiltered: any;
  user: any;

  // Sorting Rules
  listOfColumn = [
    {
      compare: (a: ItemClient, b: ItemClient) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      compare: (a: ItemClient, b: ItemClient) =>
        a.prenotation.getTime() - b.prenotation.getTime(),
      priority: false,
    },
  ];

  subscriptionDoctors: any;
  subscriptionClients: any;
  subscriptionClientAccept: any;
  subscriptionClientDeny: any;

  constructor(
    private clientService: ClientService,
    private userService: UserService
  ) {}

  loading: boolean = false;

  async ngOnInit() {
    this.loading = true;
    this.user = await this.userService.getUser();
    if (this.user.role === 'doctor') {
      this.getClientNotConfirmed();
    } else {
      this.subscriptionDoctors = this.userService.getAllDoctors().subscribe({
        next: (v) => {
          this.doctors = v;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.getClientNotConfirmed();
        },
      });
    }
  }

  //FUNCTION FOR GET ALL CLIENT NOT CONFIRMED AND FILTER BY DOCTOR
  async getClientNotConfirmed() {
    let notFilteredClient: any = [];
    this.subscriptionClients = this.clientService
      .getAllClientNotConfirmed()
      .subscribe(async (res: any) => {
        notFilteredClient = res.map((item: any) => {
          if (this.user.role === 'doctor') {
            if (this.user.sub === item.doctorSelected) {
              return {
                _id: item._id,
                name: item.name.replace(/\b(\w)/g, (s: any) => s.toUpperCase()),
                email: item.email,
                phone: item.phone,
                doctorSelected: item.doctorSelected,
                doctorName: this.user.name,
                isConfirmed: item.isConfirmed,
                prenotation: new Date(item.prenotation),
              };
            } else {
              return;
            }
          } else {
            const doctor = this.doctors.filter(
              (d: any) => d._id === item.doctorSelected
            );
            return {
              _id: item._id,
              name: item.name.replace(/\b(\w)/g, (s: any) => s.toUpperCase()),
              email: item.email,
              phone: item.phone,
              doctorSelected: item.doctorSelected,
              doctorName: doctor[0] == undefined ? 'dad' : doctor[0].name,
              isConfirmed: item.isConfirmed,
              prenotation: new Date(item.prenotation),
            };
          }
        });
        this.listOfClient = await notFilteredClient.filter(
          (e: any) => e != null
        );
        this.listOfDisplayData = [...this.listOfClient];
        this.loading = false;
      });
  }

  //FUNCTION FOR ACCEPT OR DENY REQUEST
  acceptRequest(id: string, body: any) {
    this.subscriptionClientAccept = this.clientService
      .confirmRequest(id, body)
      .subscribe((res: any) => {});
    this.listOfDisplayData = this.listOfClient.filter((e: any) => e._id !== id);
  }
  denyRequest(id: string, body: any) {
    this.subscriptionClientDeny = this.clientService
      .rejectRequest(id, body)
      .subscribe((res: any) => {
        this.listOfDisplayData = this.listOfClient.filter(
          (e: any) => e._id !== id
        );
      });
  }

  //Search the data
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfClient.filter(
      (item: ItemClient) =>
        item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
    console.log(this.listOfDisplayData);
  }

  //Reset the search value
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  ngOnDestroy(): void {
    if (this.subscriptionDoctors != null)
      this.subscriptionDoctors.unsubscribe();
    if (this.subscriptionClients != null)
      this.subscriptionClients.unsubscribe();
    if (this.subscriptionClientAccept != null)
      this.subscriptionClientAccept.unsubscribe();
    if (this.subscriptionClientDeny != null)
      this.subscriptionClientDeny.unsubscribe();
  }
}
