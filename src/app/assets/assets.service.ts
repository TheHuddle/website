import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor() { }

  get(suffix: string): string {
    return `${environment.apiBase}/assets/${suffix}`;
  }
}
