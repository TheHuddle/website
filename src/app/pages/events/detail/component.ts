import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import * as moment from 'moment'

import { ApiService } from '@services/api.service'


@Component({
  selector: 'app-events',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class EventDetailComponent implements OnInit {
  public readonly datestring = 'dddd MMMM D, YYYY [at] hh:mma'
  event: any
  loading: boolean = true;
  historical: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.getEventData(params['id']),
      error => this.loading = false,
    );
  }

  private getEventData(id) {
    this.api.get(`items/Event/${id}`).subscribe(
      result => this.setEventData(result.data),
      error => this.loading = false,
    );
  }

  private setEventData(data) {
    this.event = data;

    if ( !this.event.title ) {
      this.loading = false;
      return;
    }

    const today = moment();
    const start = moment(this.event.start);
    const stop  = moment(this.event.deadline);

    this.event.start = start.format(this.datestring);
    this.event.deadline = stop.format(this.datestring);

    this.historical = today > stop;
    this.loading = false;
  }
}
