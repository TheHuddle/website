import { Component, OnInit } from '@angular/core';

import { ApiService } from '@services/api.service';
import { AssetsService } from '@services/assets.service';

@Component({
  selector: 'app-contact',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class ContactComponent implements OnInit {
  public communityCard: any = {}
  public cards: [any] = [{}]

  constructor(
    private apiService: ApiService,
    private assets: AssetsService,
  ) { }

  ngOnInit(): void {
    const fields = 'discord_link,email,image,bio,user.*'
    this.apiService.get(`items/ContactCard?fields=${fields}`).subscribe(
      (result) => this.updateContactCards(result.data)
    );
  }

  private updateContactCards(data) {
    this.cards = data.map((datum) => {
      const card = {
        userId      : datum.user.id,
        first       : datum.user.first_name,
        last        : datum.user.last_name,
        pronouns    : datum.user.pronouns,
        discord     : datum.user.discord_handle,
        discordlink : datum.discord_link,
        title       : datum.user.title,
        bio         : datum.bio,
        email       : datum.email,
        avatar      : this.assets.get(datum.user.avatar),
        cover       : this.assets.get(datum.image),
      }

      if (card.title === 'Community Email') {
        this.communityCard = {...card};
        delete this.communityCard.title;
        this.communityCard.discord = 'discord';
      } else {
        return card;
      }
    }).filter(nonNull => nonNull);
  }
}
