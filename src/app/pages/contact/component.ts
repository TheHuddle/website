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
    private api: ApiService,
    private assets: AssetsService,
  ) { }

  ngOnInit(): void {
    this.getContactCards();
  }

  private getContactCards() {
    const query = `
    query {
      ContactCard {
        bio
        discord_link
        email
        image { id }
        user {
          id
          avatar { id }
          discord_handle
          first_name
          last_name
          pronouns
          title
        }
      }
    }
    `;
    this.api.query(query).subscribe(
      (result) => this.updateContactCards(result.data),
    );
  }

  private getFlatCard(card) {
    return {
      userId      : card.user.id,
      first       : card.user.first_name,
      last        : card.user.last_name,
      pronouns    : card.user.pronouns,
      discord     : card.user.discord_handle,
      discordlink : card.discord_link,
      title       : card.user.title,
      bio         : card.bio,
      email       : card.email,
      avatar      : this.assets.get(card.user.avatar),
      cover       : this.assets.get(card.image.id),
    }
  }

  private updateContactCards(data) {
    this.cards = data.ContactCard.map((item) => {
      const card = this.getFlatCard(item)

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
