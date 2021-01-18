import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  get(route: string, params?: HttpParams, headers?: HttpHeaders) {
    return this.http.get(`${environment.urlBase}/${route}`, { params });
  }

  post(route: string, body?: object, httpHeaders?: HttpHeaders) {
    return this.http.post(`${environment.urlBase}/${route}`, body, { headers: httpHeaders });
  }

  delete(route: string) {
    return this.http.delete(`${environment.urlBase}/${route}`);
  }

  patch(route: string, body?: object) {
    console.log({ route, body });
    return this.http.patch(`${environment.urlBase}/${route}`, body);
  }
}
