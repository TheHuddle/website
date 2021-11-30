import { Component, OnInit } from '@angular/core';

import { environment } from '@environment';


@Component({
  selector: 'app-about',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class AboutComponent implements OnInit {
  registrationLink = environment.registration

  constructor() { }

  ngOnInit(): void {
  }

}
