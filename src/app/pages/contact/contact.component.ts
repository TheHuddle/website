import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  public communityCard: any = {}
  public cards: [any] = [{}]

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const fields = 'discord_link,email,image,bio,user.*'
    this.apiService.get(`items/ContactCard?fields=${fields}`).subscribe(
      (result) => this.updateContactCards(result.data)
    );
  }

  private updateContactCards(data) {
    this.cards = data.map((datum) => {
      console.log(datum)
      const card = {
        first       : datum.user.first_name,
        last        : datum.user.last_name,
        pronouns    : datum.user.pronouns,
        discord     : datum.user.discord_handle,
        discordlink : datum.discord_link,
        title       : datum.user.title,
        bio         : datum.bio,
        email       : datum.email,
        avatar      : `https://api.codehuddle.org/assets/${datum.user.avatar}`,
        cover       : `https://api.codehuddle.org/assets/${datum.image}`,
      }
        console.log(card);

      if (card.title === 'Community Email') {
        this.communityCard = {...card}
      } else {
        return card
      }
    });
  }
}
