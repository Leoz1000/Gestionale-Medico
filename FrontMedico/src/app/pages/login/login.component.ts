import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  hide = true;
  isLoading: boolean = false;
  textLoading: string = 'Login';

  constructor(
    private authService: AuthService,
    private storegeService: StorageService,
    private router: Router
  ) {}

  //Function to login the user and store the token in local storage and redirect to home page
  onSubmit(form: NgForm): void {
    const { username, password } = form.value;
    this.isLoading = true;
    this.textLoading = '';
    //Check if the user is logged in or not
    this.authService.login(username, password).subscribe({
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
  }

  //Function to redirect to home page
  homePage(): void {
    window.location.reload();
    this.router.navigate(['/home']);
  }
}
