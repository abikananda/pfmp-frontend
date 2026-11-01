import { Component, Input } from '@angular/core';
import { NavigationItem } from '../../navigation';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent {
  @Input() item!: NavigationItem;
}
