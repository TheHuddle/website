import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs';

import * as moment from 'moment';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.apiBase}/auth/login`, {
      email: email,
      password: password,
    }).pipe(map((result) => this.setToken(result)));
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  loggedIn() {
    const x = localStorage.getItem('47be8bb8-ac4e-4d0c-9e3c-53dd4dcd0262')
    return x !== null && moment(x).isBefore(moment())
  }

  refresh() {
    if (this.loggedIn()) {
      this.http.post(`${environment.apiBase}/auth/refresh`, {
        refresh_token: localStorage.getItem('41835236-a088-4455-bc90-cb781d8404f4'),
      }).subscribe(
        x => this.setToken(x),
        x => {
          if (environment.production) this.logout();
        }
      );
    }
  }

  clearToken() {
    [ 'f89490db-098f-427b-b5eb-7a856f1774b1',
      '41835236-a088-4455-bc90-cb781d8404f4',
      '47be8bb8-ac4e-4d0c-9e3c-53dd4dcd0262',
    ].map(x => localStorage.removeItem(x));
  }

  private setToken(result: any) {
    localStorage.setItem(
      'f89490db-098f-427b-b5eb-7a856f1774b1',
      result.data.access_token,
    )
    localStorage.setItem(
      '41835236-a088-4455-bc90-cb781d8404f4',
      result.data.refresh_token,
    )
    localStorage.setItem(
      '47be8bb8-ac4e-4d0c-9e3c-53dd4dcd0262',
      moment().add(result.expires, 'millisecond').format(),
    )
  }

  getHeaders() {
    const token = localStorage.getItem('f89490db-098f-427b-b5eb-7a856f1774b1');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    if (!token) {
      // @ts-ignore
      delete headers['Authorization'];
    }

    return headers
  }
}
