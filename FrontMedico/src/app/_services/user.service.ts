import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://angular-nest-auth-sandy.vercel.app/';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  //GET ALL DOCTORS
  getAllDoctors(): Observable<any> {
    return this.httpClient.get(this.url + 'doctors', {});
  }

  //GET ALL USER WITH AL ROLE
  getUserAll(): Observable<any> {
    const user = this.getUser();
    const token = this.storageService.getToken();
    return this.httpClient.post(
      this.url + 'all',
      {
        sub: user.sub,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token.accessToken,
          role: user.role,
        },
      }
    );
  }

  //GET USER INFO
  getUser() {
    const user = this.storageService.getDecodedAccessToken();
    if (user) {
      return user;
    } else {
      this.router.navigate(['/login']);
    }
  }

  //EDIT A USER
  editUser(body: any): Observable<any> {
    const user = this.storageService.getDecodedAccessToken();
    const token = this.storageService.getToken();
    return this.httpClient.patch(this.url + body._id, body, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
        role: user.role,
      },
    });
  }

  //DELETE A USER
  delUser(id: string): Observable<any> {
    const user = this.storageService.getDecodedAccessToken();
    const token = this.storageService.getToken();
    return this.httpClient.delete(this.url + id, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
        role: user.role,
      },
    });
  }
}
