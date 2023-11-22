import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { ClientService } from '../../_services/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anamesi',
  templateUrl: './anamesi.component.html',
  styleUrls: ['./anamesi.component.css'],
})
export class AnamesiComponent implements OnInit, OnDestroy {
  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private clientService: ClientService,
    private router: ActivatedRoute,
    private routerLink: Router
  ) {
    //VALIDATE ADD FORM
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      fiscalCode: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      name: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      doctorSelected: ['', [Validators.required]],
    });
    //VALIDATE EDIT FORM
    this.validateFormEdit = this.fb.group({
      name: ['', []],
      fiscalCode: ['', [Validators.minLength(16), Validators.maxLength(16)]],

      email: ['', [Validators.email]],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      doctorSelected: ['', []],
    });
  }

  id: string = '';
  doctors: any;

  //VALIDATE ADD FORM
  validateForm: FormGroup<{
    name: FormControl<string>;
    fiscalCode: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    doctorSelected: FormControl<string>;
  }>;

  //EDIT VALIDATE FORM
  validateFormEdit: FormGroup<{
    name: FormControl<string>;
    fiscalCode: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    doctorSelected: FormControl<string>;
  }>;
  //VAR FORM EDIT
  name?: string = '';
  email?: string = '';
  fiscalCode?: string = '';
  phone?: string = '';
  doctorSelected?: string = '';

  addNewAnamnesi: boolean = false;

  newAnamnesi: string = '';
  newPrenotations: Date = new Date();

  prenotations: Date[] = [];
  anamnesi: string[] = [];

  anamnesis: [string, Date][] = [];
  //CHECK FISCALCODE
  fiscalCodeExists: boolean = false;

  //SUBSCRIBE
  subscriptionRoute: any;
  subscriptionDoctors: any;
  subscriptionClients: any;
  subscriptionClientsAdd: any;
  subscriptionClientsEdit: any;
  subscriptionClientsAddAnamnesi: any;
  subscriptionClientsEditAnamnesi: any;
  subscriptionClientsDeleteAnamnesi: any;

  ngOnInit() {
    //Get id from url and get doctors
    this.subscriptionRoute = this.router.params.subscribe((params) => {
      this.id = params['id']; //TAKE URL PARAMS
    });
    this.subscriptionDoctors = this.userService
      .getAllDoctors()
      .subscribe((res) => {
        this.doctors = res;
        if (this.id !== 'new' && this.id !== '') {
          //CHECK ID FROM URL
          //TAKE PATIENT INFO
          this.subscriptionClients = this.clientService
            .getByIdPatient(this.id)
            .subscribe({
              next: (res) => {
                this.name = res.name;
                this.email = res.email;
                this.fiscalCode = res.fiscalCode;
                this.phone = res.phone;
                this.doctorSelected = this.doctors.find(
                  //SET DOCTOR NAME
                  (e: any) => e._id === res.doctorSelected
                ).name;

                this.anamnesi = res.anamnesis;
                this.prenotations = res.prenotations;

                for (let index = 0; index < this.anamnesi.length; index++) {
                  const anamnesisDate = new Date(this.prenotations[index]); // CONVERT STRING FROM DB IN DATE
                  this.anamnesis.push([this.anamnesi[index], anamnesisDate]); //PUSH ANAMNESI IN ARRAY
                }
                this.anamnesis.sort((a, b) => a[1].getTime() - b[1].getTime()); //ORDER ARRAY
              },
              error: (error) => {
                if (error.status == 500) {
                  this.fiscalCodeExists = true;
                  return;
                }
              },
              complete: () => {},
            });
        }
      });
  }

  //NEW USER INFO FORM AND SEND DATA
  submitForm(): void {
    setTimeout(() => {
      if (this.validateForm.valid) {
        this.validateForm.value.fiscalCode =
          this.validateForm.value.fiscalCode?.toUpperCase();
        this.subscriptionClientsAdd = this.clientService
          .createPatient(this.validateForm.value)
          .subscribe({
            next: () => {
              this.routerLink.navigate(['/patient']);
            },
            error: (error) => {
              if (error.status == 500) {
                this.fiscalCodeExists = true;
                return;
              }
            },
            complete: () => {},
          });
      } else {
        Object.values(this.validateForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }, 1000);
  }
  //USER INFO UPDATE FORM AND SEND DATA
  submitFormEdit(): void {
    setTimeout(() => {
      if (this.validateFormEdit.valid) {
        this.validateFormEdit.value.fiscalCode =
          this.validateFormEdit.value.fiscalCode?.toUpperCase();
        this.subscriptionClientsEdit = this.clientService
          .updatePatient(this.id, {
            name:
              this.validateFormEdit.value.name === ''
                ? this.name
                : this.validateFormEdit.value.name,
            email:
              this.validateFormEdit.value.email === ''
                ? this.email
                : this.validateFormEdit.value.email,
            fiscalCode:
              this.validateFormEdit.value.fiscalCode === ''
                ? this.fiscalCode
                : this.validateFormEdit.value.fiscalCode,
            phone:
              this.validateFormEdit.value.phone === ''
                ? this.phone
                : this.validateFormEdit.value.phone,
            doctorSelected:
              this.validateFormEdit.value.doctorSelected === ''
                ? ''
                : this.validateFormEdit.value.doctorSelected,
          })
          .subscribe({
            next: () => {
              this.routerLink.navigate(['/patient']);
            },
            error: (error) => {
              if (error.status == 500) {
                this.fiscalCodeExists = true;
                return;
              }
            },
            complete: () => {},
          });
      } else {
        Object.values(this.validateFormEdit.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }, 500);
  }

  //ADD ANAMNESI
  addAnamnesi() {
    if (this.addNewAnamnesi === false) {
      //CHECK ANAMNESI CONTROLL
      this.addNewAnamnesi = true;
      return;
    }
    if (this.addNewAnamnesi === true) {
      if (this.newAnamnesi !== '') {
        //CHECK NEWANAMNESI IS EMPTY
        this.subscriptionClientsAddAnamnesi = this.clientService
          .createNewAnamnesi(this.id, {
            //SEND NEW ANAMNESI
            anamnesi: this.newAnamnesi,
            prenotation: this.newPrenotations,
          })
          .subscribe({
            next: () => {
              this.anamnesis.push([this.newAnamnesi, this.newPrenotations]); //PUSH NEW ANAMNESI

              this.anamnesi.push(this.newAnamnesi);
              this.prenotations.push(this.newPrenotations);

              this.anamnesis.sort((a, b) => a[1].getTime() - b[1].getTime()); //ORDER ANAMNESIs
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {
              //RESET VAR NEW ANAMNESI
              this.newAnamnesi = '';
              this.newPrenotations = new Date();
              this.addNewAnamnesi = false;
            },
          });
      } else {
        this.addNewAnamnesi = false;
        this.newPrenotations = new Date();
      }
    }
  }

  //UPDATE ANAMNESI
  prenotationUpdate: Date = new Date();
  checkPrenotationChange: boolean = false;
  anamnesiUpdate: string = '';

  //UPDATE ANAMNESI AND PRENOTATION VAR WHEN NGMODELCHANGE
  updatePrenotation(prenotation: Date) {
    console.log(prenotation);
    this.prenotationUpdate = prenotation;
    this.checkPrenotationChange = true;
  }

  updateAnamnesi(anamnesi: string) {
    this.anamnesiUpdate = anamnesi;
  }

  updateAll(index: number) {
    //CHECK ANAMNESI IS EMPTY AND CHECK DATE CHANGES
    if (this.anamnesiUpdate !== '' && this.checkPrenotationChange) {
      this.anamnesis[index][0] = this.anamnesiUpdate; //UPDATE ANAMNESI TEXT
      this.anamnesis[index][1] = this.prenotationUpdate; //UPDATE ANAMNESI DATE
      this.anamnesis.sort((a, b) => a[1].getTime() - b[1].getTime()); //ORDER NEW ANAMNESI
    } else if (this.anamnesiUpdate !== '') {
      //CHECK ANAMNESI IS EMPTY
      this.anamnesis[index][0] = this.anamnesiUpdate; //UPDATE ANAMNESI TEXT
    } else if (this.checkPrenotationChange && this.prenotationUpdate !== null) {
      //CHECK DATA CHANGES
      this.anamnesis[index][1] = this.prenotationUpdate; //UPDATE ANAMNESI DATE
      this.anamnesis.sort((a, b) => a[1].getTime() - b[1].getTime()); //ORDER NEW ANAMN
    } else {
      //RESET VAR IF ANAMNESI IS EMPTY AND PRENOTATION NOT CHANGE
      this.anamnesiUpdate = '';
      this.checkPrenotationChange = false;
      this.prenotationUpdate = new Date();
      window.location.reload();
      return;
    }

    const anamnesis: string[] = this.anamnesis.map((tuple) => tuple[0]); //GENERATE ARRAY OF ANAMNESIS
    const prenotations: Date[] = this.anamnesis.map((tuple) => tuple[1]); //GENERATE ARRAY OF PRENOTATIONS
    //SEND DATA
    this.subscriptionClientsEditAnamnesi = this.clientService
      .updatePatient(this.id, {
        //SEND DATA
        anamnesis: anamnesis,
        prenotations: prenotations,
      })
      .subscribe({
        next: () => {},
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          //RESET VAR UPDATE ANAMNESI
          this.anamnesiUpdate = '';
          this.checkPrenotationChange = false;
          this.prenotationUpdate = new Date();
        },
      });
  }

  //DELETE ANAMNESI
  deleteAnamnesi(index: number, anamesi: [string, Date]) {
    this.subscriptionClientsDeleteAnamnesi = this.clientService
      .deleteAnamnesi(this.id, anamesi)
      .subscribe({
        next: () => {
          this.anamnesis.splice(index, 1); //REMOVE ANAMNESI FROM ARRAY
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {},
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptionRoute != null) this.subscriptionRoute.unsubscribe();
    if (this.subscriptionDoctors != null)
      this.subscriptionDoctors.unsubscribe();
    if (this.subscriptionClients != null)
      this.subscriptionClients.unsubscribe();
    if (this.subscriptionClientsAdd != null)
      this.subscriptionClientsAdd.unsubscribe();
    if (this.subscriptionClientsEdit != null)
      this.subscriptionClientsEdit.unsubscribe();
    if (this.subscriptionClientsAddAnamnesi != null)
      this.subscriptionClientsAddAnamnesi.unsubscribe();
    if (this.subscriptionClientsEditAnamnesi != null)
      this.subscriptionClientsEditAnamnesi.unsubscribe();
    if (this.subscriptionClientsDeleteAnamnesi != null)
      this.subscriptionClientsDeleteAnamnesi.unsubscribe();
  }
}
