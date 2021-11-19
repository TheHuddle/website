import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  discordHandle = '@'

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.get('users/me').subscribe(
      x => this.discordHandle = x.data.discord_handle
    );
  }

}
