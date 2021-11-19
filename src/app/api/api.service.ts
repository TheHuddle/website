import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  private readonly baseUrl = 'https://api.codehuddle.org'

  get(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.get(`${this.baseUrl}/${url}`, options);
    this.authService.refresh();
    return x
  }

  delete(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.delete(`${this.baseUrl}/${url}`, options);
    this.authService.refresh();
    return x
  }

  post(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.post(`${this.baseUrl}/${url}`, body, options);
    this.authService.refresh();
    return x
  }

  put(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    const x = this.http.put(`${this.baseUrl}/${url}`, body, options);
    this.authService.refresh();
    return x
  }
}
