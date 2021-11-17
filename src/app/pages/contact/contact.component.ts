import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass', '../pages.module.sass']
})
export class ContactComponent implements OnInit {

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.get('items/ContactCard?fields=user.*').subscribe(
      (result) => console.log(result)
    )
  }

}
