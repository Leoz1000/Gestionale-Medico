import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_KEY = 'tokens';

  constructor(private router: Router) {}

  //CLEAR LOCALSTORAGE
  clean(): void {
    window.localStorage.clear();
  }

  //DECODE ACCESS TOKEN JWT
  getDecodedAccessToken(): any {
    const req = JSON.parse(window.localStorage.getItem(this.USER_KEY)!);
    if (req) {
      const data: any = jwt_decode(req.accessToken);
      const user: {
        sub: string;
        username: string;
        name: string;
        role: string;
        exp: Date;
      } = {
        sub: data.sub,
        username: data.username,
        name: data.name,
        role: data.role,
        exp: new Date(data.exp * 1000),
      };
      return user;
    }
    return null;
  }

  //GET TOKEN FROM LOCALSTORAGE
  getToken(): any {
    const req = JSON.parse(window.localStorage.getItem(this.USER_KEY)!);
    return req;
  }

  //SAVETOKEN IN LOCALSTORAGE
  saveToken(token: string): void {
    if (token) {
      token = JSON.stringify(token);
      window.localStorage.setItem(this.USER_KEY, token);
    } else {
      this.router.navigate(['/login']);
    }
  }

  //CHECK USER IS LOGGED AND ACCESS TOKEN IS NOT EXPIRED
  isLogged(): boolean {
    const req = this.getToken();
    const time = this.getDecodedAccessToken();
    if (req && time.exp > new Date()) {
      return true;
    }
    if (req && time.exp < new Date()) {
      this.logout();
      return false;
    }
    return false;
  }

  //LOGOUT USER AND CALL CLEAR FUNCTION
  logout(): void {
    this.clean();
    window.location.reload();
    this.router.navigate(['/login']);
  }
}
