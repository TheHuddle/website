import { Injectable } from '@angular/core';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  constructor() {}

  get(asset: any): string {
    if (asset === null) {
      // @TODO insert default asset for null asset retrieval
      return '';
    } else if (typeof asset === 'string') {
      return `${environment.apiBase}/assets/${asset}`;
    } else {
      return `${environment.apiBase}/assets/${asset.id}`;
    }
  }
}
