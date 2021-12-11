import { Component, OnInit } from '@angular/core'

import * as moment from 'moment'

import { ApiService } from '@services/api.service'


@Component({
  selector: 'app-events',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class EventsComponent implements OnInit {
  currentEvents: any[] = [];
  historicalEvents: any[] = [];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getEventData();
  }

  private getEventData() {
    const query = `
    query {
      Event {
        deadline
        start
        title
        label
        description_short
        id
      }
    }
    `
    this.api.query(query).subscribe(
      events => this.setEventData(events.data),
    );
  }

  private setEventData(data) {
    const today = moment()
    data.Event.map(event => {
      const start = moment(event.start);
      const stop  = moment(event.deadline);

      if ( today >= start && today < stop ) {
        this.currentEvents.push({...event});
      } else if ( today >= stop ) {
        this.historicalEvents.push({...event});
      }
    });

    if ( this.currentEvents.length < 1 ) {
      this.currentEvents = [{}];
    }

    this.historicalEvents.sort(
      (a,b) => ( Number(a.label) > Number(b.label) ? 1 : -1)
    );
  }
}
