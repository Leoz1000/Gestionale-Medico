import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private storegeService: StorageService,
    private router: Router
  ) {}

  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  textLoading: string = 'Login';

  //Function to login the user and store the token in local storage and redirect to home page
  onSubmit(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.textLoading = '';
      this.authService
        .login(
          this.validateForm.value.username!,
          this.validateForm.value.password!
        )
        .subscribe({
          next: (data) => {
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.storegeService.saveToken(data);
            this.homePage();
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
            this.isLoading = false;
            this.textLoading = 'Login';
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  //Function to redirect to home page
  homePage(): void {
    window.location.reload();
    this.router.navigate(['/home']);
  }
}
