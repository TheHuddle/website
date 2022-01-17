import { Component, OnInit } from '@angular/core';

import { ApiService } from '@services/api';

@Component({
  selector: 'app-home',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class HomeComponent implements OnInit {
  discordHandle = '@';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const query = `query { users_me { discord_handle } }`;
    this.api.query(query, { isSystemQuery: true }).subscribe((result) => {
      this.discordHandle = result.data.users_me.discord_handle;
    });
  }
}
