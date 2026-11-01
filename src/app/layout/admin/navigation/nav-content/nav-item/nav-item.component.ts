import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../../navigation';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() item!: NavigationItem;

  constructor(public router: Router) {}

  isActive(): boolean {
    if (!this.item.url) return false;
    return this.item.exactMatch
      ? this.router.url === this.item.url
      : this.router.url.startsWith(this.item.url);
  }

  navigate(): void {
    if (this.item.url) {
      this.router.navigateByUrl(this.item.url);
    }
  }
}
