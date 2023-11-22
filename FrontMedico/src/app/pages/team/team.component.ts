import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit, OnDestroy {
  users: any;
  usersNotFiltered: any;
  screenWidth: number = 0;
  spanDimension: number = 12;

  //Subscription
  subscriptionUser: any;
  subscriptionAuth: any;
  subscriptionEdit: any;
  subscriptionDelete: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    //Validate Form
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      username: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    this.validateFormEdit = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: [
        '',
        [Validators.required, this.confirmationValidatorEdit],
      ],
      username: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    //Get Screen Size and Resize
    this.getScreenSize();
  }

  //VALIDETION FORMS
  validateForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    username: FormControl<string>;
    phone: FormControl<string>;
  }>;
  validateFormEdit: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    username: FormControl<string>;
    phone: FormControl<string>;
  }>;

  //Function Get Screen Size and Resize
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 990) {
      this.spanDimension = 12;
    } else {
      this.spanDimension = 24;
    }
  }

  //Get All User
  ngOnInit(): void {
    //CHECK USER ROLE AND ROUTE TO HOME IF ROLE IS SECRETARY
    const user = this.userService.getUser();
    if (user.role == 'secretary') this.router.navigate(['/home']);

    this.subscriptionUser = this.userService
      .getUserAll()
      .subscribe(async (data: any) => {
        this.usersNotFiltered = await data.map((e: any) => {
          if (e.role !== 'admin') {
            return {
              _id: e._id,
              name: e.name.replace(/\b(\w)/g, (s: any) => s.toUpperCase()),
              username: e.username,
              role: e.role,
              phone: e.phone,
              email: e.email,
            };
          }
          return;
        });
        this.users = await this.usersNotFiltered.filter(
          (data: any) => data !== undefined
        );
      });
  }

  //Modal form ADD USER CONTROLL_DATA AND SEND
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      const user = this.users.find(
        (u: any) => u.username === this.validateForm.value.username
      );
      if (user == undefined) {
        setTimeout(() => {
          this.isVisible = false;
          this.isOkLoading = false;
          //SEND NEW USER ON DB
          this.subscriptionAuth = this.authService
            .register(this.validateForm.value)
            .subscribe((data: any) => {
              this.users.push(data);
              //reset form field
              this.validateForm.reset();
            });
        }, 1000);
      } else {
        this.userExist = true;
        this.isOkLoading = false;
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }
  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  //Modal form EDIT USER CONTROLL_DATA AND SEND
  isVisibleEdit = false;
  isOkLoadingEdit = false;

  //VAR EDIT USER
  id?: string = '';
  initialUsername?: string;
  name?: string = '';
  email?: string = '';
  password?: string = '';
  username?: string = '';
  phone?: string = '';

  showModalEdit(id: string): void {
    this.isVisibleEdit = true;
    const user = this.users.filter((u: any) => u._id === id);
    this.id = user[0]._id;
    this.name = user[0].name;
    this.email = user[0].email;
    this.username = user[0].username;
    this.initialUsername = user[0].username;
    this.phone = user[0].phone;
  }
  updateConfirmValidatorEdit(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateFormEdit.controls.checkPassword.updateValueAndValidity()
    );
  }
  confirmationValidatorEdit: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !== this.validateFormEdit.controls.password.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  userExist: boolean = false;

  submitFormEdit(): void {
    this.isOkLoadingEdit = true;
    setTimeout(() => {
      const user = this.users.find(
        (u: any) => u.username === this.validateFormEdit.value.username
      );
      if (
        user == undefined ||
        this.validateFormEdit.value.username !== user.username ||
        user.username === this.initialUsername
      ) {
        if (this.validateFormEdit.value.password === '') {
          this.isVisibleEdit = false;
          this.isOkLoadingEdit = false;
          this.subscriptionEdit = this.userService
            .editUser({
              _id: this.id,
              name:
                this.validateFormEdit.value.name === ''
                  ? this.name
                  : this.validateFormEdit.value.name,
              email:
                this.validateFormEdit.value.email === ''
                  ? this.email
                  : this.validateFormEdit.value.email,
              username:
                this.validateFormEdit.value.username === ''
                  ? this.username
                  : this.validateFormEdit.value.username ===
                    this.initialUsername
                  ? this.initialUsername
                  : this.validateFormEdit.value.username,
              phone:
                this.validateFormEdit.value.phone === ''
                  ? this.phone
                  : this.validateFormEdit.value.phone,
            })
            .subscribe((data: any) => {
              const index = this.users.findIndex((e: any) => e._id === this.id);
              if (index != -1)
                this.users[index] = {
                  _id: data.id,
                  name: data.name,
                  username: data.username,
                  role: data.role,
                  phone: data.phone,
                  email: data.email,
                };
            });
        } else {
          this.isVisibleEdit = false;
          this.isOkLoadingEdit = false;
          this.subscriptionEdit = this.userService
            .editUser({
              _id: this.id,
              name: this.validateFormEdit.value.name,
              email: this.validateFormEdit.value.email,
              password: this.validateFormEdit.value.password,
              username: this.validateFormEdit.value.username,
              phone: this.phone,
            })
            .subscribe((data: any) => {
              const index = this.users.findIndex((e: any) => e._id === this.id);
              if (index != -1)
                this.users[index] = {
                  _id: data.id,
                  name: data.name,
                  username: data.username,
                  role: data.role,
                  phone: data.phone,
                  email: data.email,
                };
            });
        }
      } else {
        this.userExist = true;
        this.isVisibleEdit = true;
        this.isOkLoadingEdit = false;
      }
    }, 1000);
  }

  handleCancelEdit(): void {
    this.isVisibleEdit = false;
    this.userExist = false;
  }

  //Modal form REMOVE USER AND SEND
  isVisibleRemove = false;
  isOkLoadingRemove = false;
  idUser: string = '';
  showModalRemove(id: string): void {
    this.idUser = id;
    this.isVisibleRemove = true;
  }

  handleOkRemove(): void {
    this.isOkLoadingRemove = true;
    setTimeout(() => {
      this.isVisibleRemove = false;
      this.isOkLoadingRemove = false;
      this.subscriptionDelete = this.userService
        .delUser(this.idUser)
        .subscribe((data) => {});
      this.users = this.users.filter((e: any) => e._id !== this.idUser);
    }, 1000);
  }

  handleCancelRemove(): void {
    this.isVisibleRemove = false;
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
    if (this.subscriptionAuth != null) this.subscriptionAuth.unsubscribe();
    if (this.subscriptionEdit != null) this.subscriptionEdit.unsubscribe();
    if (this.subscriptionDelete != null) this.subscriptionDelete.unsubscribe();
  }
}
