import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { UserService } from 'src/app/_services/user.service';

interface ItemPatient {
  _id: string;
  name: string;
  fiscalCode: string;
  email: number;
  phone: string;
  doctorSelected: string;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit, OnDestroy {
  listOfPatient: ItemPatient[] = [];
  listOfDisplayData = [...this.listOfPatient];

  //Search Variables
  searchValue = '';
  visible = false;

  //Doctors
  doctors: any;

  // Sorting Rules
  listOfColumn = [
    {
      compare: (a: ItemPatient, b: ItemPatient) =>
        a.fiscalCode.localeCompare(b.fiscalCode),
      priority: false,
    },
    {
      compare: (a: ItemPatient, b: ItemPatient) => a.name.localeCompare(b.name),
      priority: 2,
    },
  ];

  subscriptionDoctors: any;
  subscriptionClients: any;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private router: Router
  ) {}

  loading: boolean = false;

  ngOnInit(): void {
    const user = this.userService.getUser();
    let notFilteredPatient: any = [];
    this.loading = true;
    this.subscriptionDoctors = this.userService
      .getAllDoctors()
      .subscribe((res) => {
        this.doctors = res;
        if (user.role === 'doctor') {
          this.subscriptionClients = this.clientService
            .getAllPatients()
            .subscribe(async (res) => {
              notFilteredPatient = res.map((element: any) => {
                if (user.sub === element.doctorSelected) {
                  return {
                    _id: element._id,
                    name: element.name.replace(/\b(\w)/g, (s: any) =>
                      s.toUpperCase()
                    ),
                    fiscalCode: element.fiscalCode,
                    email: element.email,
                    phone: element.phone,
                    doctorSelected: user.name,
                  };
                } else {
                  return;
                }
              });
              this.listOfDisplayData = [
                ...(this.listOfPatient = await notFilteredPatient.filter(
                  (e: any) => e != null
                )),
              ];
              this.loading = false;
            });
        } else {
          this.subscriptionClients = this.clientService
            .getAllPatients()
            .subscribe(async (res) => {
              this.listOfPatient = res;
              this.listOfPatient.forEach(async (patient) => {
                patient.doctorSelected = await this.doctors.find(
                  (doctor: any) => doctor._id === patient.doctorSelected
                ).name;
              });
              this.listOfDisplayData = [...this.listOfPatient];
              this.loading = false;
            });
        }
      });
  }

  openScheda(_id: string) {
    this.router.navigate(['/anamnesi/' + _id]);
  }

  //Search the data
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfPatient.filter(
      (item: ItemPatient) =>
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
    this.subscriptionDoctors.unsubscribe();
    this.subscriptionClients.unsubscribe();
  }
}
