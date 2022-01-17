import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { ApiService } from '@services/api';

@Component({
  selector: 'app-event-detail',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class EventDetailComponent implements OnInit {
  public readonly datestring = 'dddd MMMM D, YYYY [at] hh:mma';
  event: any;
  loading: boolean = true;
  historical: boolean = true;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => this.getEventData(params['id']),
      (error) => (this.loading = false)
    );
  }

  private getEventData(eventId) {
    const query = `
      query($id: ID!) {
        Event_by_id(id: $id) {
          deadline
          description
          label
          prizes
          rules
          start
          title
        }
      }
    `;
    const options = { variables: { id: eventId } };
    this.api.query(query, options).subscribe(
      (result) => this.setEventData(result.data),
      (error) => (this.loading = false)
    );
  }

  private setEventData(data) {
    this.event = data.Event_by_id;

    if (!this.event.title) {
      this.loading = false;
      return;
    }

    const today = moment();
    const start = moment(this.event.start);
    const stop = moment(this.event.deadline);

    this.event.start = start.format(this.datestring);
    this.event.deadline = stop.format(this.datestring);

    this.historical = today > stop;
    this.loading = false;
  }
}
