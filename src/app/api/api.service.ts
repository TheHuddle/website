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

  private readonly baseUrl = 'http://localhost:8055'

  get(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    return this.http.get(`${this.baseUrl}/${url}`, options);
  }

  delete(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    return this.http.delete(`${this.baseUrl}/${url}`, options);
  }

  post(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    return this.http.post(`${this.baseUrl}/${url}`, body, options);
  }

  put(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() }
    return this.http.put(`${this.baseUrl}/${url}`, body, options);
  }
}
