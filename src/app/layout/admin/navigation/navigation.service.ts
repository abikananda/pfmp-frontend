import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  isActive(url: string, exact: boolean = false): boolean {
    if (!url) return false;
    if (exact) {
      return this.currentUrl === url;
    }
    return this.currentUrl.startsWith(url);
  }
}
