import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { UserService } from 'src/app/_services/user.service';

interface DataItem {
  name: string;
  email: string;
  phone: string;
  doctorSelected: string;
  prenotation: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private clientService: ClientService,
    private userService: UserService
  ) {}

  // Search
  searchValue = '';
  visible = false;

  // Sorting Rules
  listOfColumn = [
    {
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      compare: (a: DataItem, b: DataItem) =>
        a.prenotation.getTime() - b.prenotation.getTime(),
      priority: 1,
    },
  ];

  // Data
  listOfData: DataItem[] = [];
  listOfDisplayData = [...this.listOfData];
  doctors: any;

  //Subscribe
  subscriptionDoctors: any;
  subscriptionClients: any;

  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.subscriptionDoctors = this.userService
      .getAllDoctors()
      .subscribe(async (data) => {
        this.doctors = data;
        this.subscriptionClients = this.clientService
          .getAllClientConfirmed()
          .subscribe(async (data) => {
            this.listOfData = await data.map((item: DataItem) => {
              return {
                name: item.name,
                email: item.email,
                phone: item.phone,
                doctorSelected: this.doctors.find(
                  (d: any) => d._id === item.doctorSelected
                ).name,
                prenotation: new Date(item.prenotation),
              };
            });
            this.listOfDisplayData = [...this.listOfData];
            this.loading = false;
          });
      });
  }

  //Reset the search value
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  //Search the data
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: DataItem) =>
        item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptionDoctors != null)
      this.subscriptionDoctors.unsubscribe();
    if (this.subscriptionClients != null)
      this.subscriptionClients.unsubscribe();
  }
}
