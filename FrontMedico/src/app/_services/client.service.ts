import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url = 'https://backend-steel-gamma.vercel.app/';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  //GET ALL NOT CONFIRMED CLIENT
  getAllClientNotConfirmed(): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.get(this.url + 'client/notConfirmed', {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //GET ALL CONFIRMED CLIENT
  getAllClientConfirmed(): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.get(this.url + 'client/confirmed', {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //ACCEPT CLIENT REQUEST OR DENY CLIENT REQUEST
  confirmRequest(id: string, body: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.patch(this.url + 'client/confirmed/' + id, body, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }
  rejectRequest(id: string, body: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.patch(this.url + 'client/rejected/' + id, body, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //CREATE NEW PATIENT
  createNewAnamnesi(id: string, body: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.post(this.url + 'patient/anamnesi/' + id, body, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //CREATE NEW PATIENT
  createPatient(body: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.post(this.url + 'patient', body, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //GET ALL PATIENT
  getAllPatients(): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.get(this.url + 'patient', {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //GET A PATIENT
  getByIdPatient(id: string): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.get(this.url + 'patient/' + id, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //UPDATE A PATIENT
  updatePatient(id: string, body: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.patch(this.url + 'patient/' + id, body, {
      headers: {
        Authorization: 'Bearer ' + token.accessToken,
      },
    });
  }

  //DELETE ANAMNESI
  deleteAnamnesi(id: string, body: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.httpClient.post(
      this.url + 'patient/anamnesi/delete/' + id,
      { anamnesi: body[0], prenotation: body[1] },
      {
        headers: {
          Authorization: 'Bearer ' + token.accessToken,
        },
      }
    );
  }
}

//MEDOTO PER FARE RICHIESTE HTTP PER OTTIMIZZARE LA CHIUSURA DEL SUBSCRIBE

// async GetUtenti(): Promise<UserModel[]> {
//   return new Promise((resolve, reject) => {
//     const requestUrl = `${this.apiUrl}/users`;

//     const response: any = this.httpClient.get(requestUrl).subscribe({
//       next: (response: any) => {
//         resolve(response);
//       },
//       error: (error) => {
//         console.error('ApiService.httpGet() error', response);
//         reject(error);
//         throw new Error('Errore nella richiesta API');
//       },
//     });
//   });
// }

//OPPURE CHIUDERE I SUBSCRIBE DIRETTAMENTE NEI COMPONENTI TRAMITE NGDESTROY
