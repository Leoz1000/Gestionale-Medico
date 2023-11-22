import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private httpClient: HttpClient) {}
  setAppointement(url: string, body: {}) {
    return this.httpClient.post(url, body);
  }
  getAppointement(url: string) {
    return this.httpClient.get(url);
  }
  updateAppointement(url: string, id: string, body: {}) {
    return this.httpClient.patch(url + '/' + id, body);
  }
  removeAppointement(url: string, id: string) {
    return this.httpClient.delete(url + '/' + id);
  }
}
