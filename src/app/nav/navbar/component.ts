import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

import { Pages } from '@pages/pages';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleMenuEvent = new EventEmitter<any>();
  @Output() closeMenuEvent = new EventEmitter<any>();
  @Output() openMenuEvent = new EventEmitter<any>();

  toggleMenu = () => this.toggleMenuEvent.emit();
  closeMenu = () => this.closeMenuEvent.emit();
  openMenu = () => this.openMenuEvent.emit();

  public tabTitle = '';
  private readonly pages = Pages;

  constructor(private router: Router, private authService: AuthService) {}

  logout = () => this.authService.logout();
  loggedIn = false;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => this.updateSettings(event));
  }

  private updateSettings(event: any) {
    const currentPage = this.pages.find(
      (page) => page.route === event.urlAfterRedirects
    );
    this.loggedIn = this.authService.loggedIn();
    this.tabTitle = currentPage?.title || '';
  }
}
