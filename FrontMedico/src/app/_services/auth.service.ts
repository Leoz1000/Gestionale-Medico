import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    secure: 'true',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API = 'https://angular-nest-auth-sandy.vercel.app/';
  private USER_KEY = 'tokens';

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  //LOGIN FUCTION
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(
      this.AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  //REGISTER FUCTION
  register(body: any): Observable<any> {
    const token = JSON.parse(window.localStorage.getItem(this.USER_KEY)!);
    const user = this.userService.getUser();

    //USARE QUESTO URL PERCHE NON ESISTE UNA PAGINA DI AUTH PER REGISTRAZIONE
    return this.httpClient.post(
      'https://angular-nest-auth-sandy.vercel.app/' + 'users',
      body,
      {
        headers: {
          Authorization: 'Bearer ' + token.accessToken,
          role: user.role,
        },
      }
    );
  }

  //LOGOUT FUCTION
  logout(user: any): Observable<any> {
    const token = JSON.parse(window.localStorage.getItem(this.USER_KEY)!);
    return this.httpClient.post(
      this.AUTH_API + 'logout',
      { user: user },
      {
        headers: {
          Authorization: 'Bearer ' + token.accessToken,
        },
      }
    );
  }
}
