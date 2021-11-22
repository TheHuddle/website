import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '@services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  get(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.get(`${environment.apiBase}/${url}`, options);
    this.authService.refresh();
    return x
  }

  delete(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.delete(`${environment.apiBase}/${url}`, options);
    this.authService.refresh();
    return x
  }

  post(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.post(`${environment.apiBase}/${url}`, body, options);
    this.authService.refresh();
    return x
  }

  put(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.put(`${environment.apiBase}/${url}`, body, options);
    this.authService.refresh();
    return x
  }
}
