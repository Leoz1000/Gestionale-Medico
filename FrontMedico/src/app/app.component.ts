import { Component, OnInit } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isLogged = true;
  user: any;
  roleAuthorized: boolean = false;

  constructor(private storageService: StorageService, private router: Router) {}

  //Check if user is logged and if he has the right role to access the page
  ngOnInit(): void {
    this.isLogged = this.storageService.isLogged();
    if (this.isLogged) {
      this.user = this.storageService.getDecodedAccessToken();
      if (this.user.role === 'admin' || this.user.role === 'doctor') {
        this.roleAuthorized = true;
      } else {
        this.roleAuthorized = false;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  //Logout
  logout() {
    this.storageService.clean();
    this.isLogged = false;
    window.location.reload();
  }
}
