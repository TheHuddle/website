import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

import { Pages } from '@pages/pages'


@Component({
  selector: 'app-navlinks',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class NavlinksComponent implements OnInit {
  @Output() toggleMenuEvent = new EventEmitter<any>();
  @Output() closeMenuEvent  = new EventEmitter<any>();
  @Output() openMenuEvent   = new EventEmitter<any>();

  toggleMenu = () => this.toggleMenuEvent.emit();
  closeMenu  = () => this.closeMenuEvent.emit();
  openMenu   = () => this.openMenuEvent.emit();

  public readonly links = Pages;
  public active = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(
      event => event instanceof NavigationEnd
    )).subscribe((event) => this.updateActiveRoute(event));
  }

  updateActiveRoute(event: any): void {
    const activeLink = this.links.find(
      link => link.route === event.urlAfterRedirects
    );
    this.active = activeLink?.route || '';
  }
}
