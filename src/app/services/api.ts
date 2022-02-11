import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '@services/auth';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  get(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() };
    const x = this.http.get(`${environment.apiBase}/${url}`, options);
    this.authService.refresh();
    return x;
  }

  delete(url: string): Observable<any> {
    const options = { headers: this.authService.getHeaders() };
    const x = this.http.delete(`${environment.apiBase}/${url}`, options);
    this.authService.refresh();
    return x;
  }

  post(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() };
    const x = this.http.post(`${environment.apiBase}/${url}`, body, options);
    this.authService.refresh();
    return x;
  }

  put(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() };
    const x = this.http.put(`${environment.apiBase}/${url}`, body, options);
    this.authService.refresh();
    return x;
  }

  patch(url: string, body: any): Observable<any> {
    const options = { headers: this.authService.getHeaders() };
    const x = this.http.patch(`${environment.apiBase}/${url}`, body, options);
    this.authService.refresh();
    return x;
  }

  upload(file: any): Observable<any> {
    const headers = this.authService.getHeaders();

    // @ts-ignore
    delete headers['Content-Type'];

    const options = { headers: headers };

    const formData = new FormData();
    formData.append('file', file);

    const x = this.http.post(`${environment.apiBase}/files`, formData, options);
    this.authService.refresh();
    return x;
  }

  query(query: string, { isSystemQuery = false, variables = {} } = {}) {
    return this.post(
      isSystemQuery ? 'graphql/system' : 'graphql',
      JSON.stringify({ query: query, variables: variables })
    );
  }
}
