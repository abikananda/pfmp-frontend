// Angular Import
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { TokenStorageService } from '../../../../auth/token-storage.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent {
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;
  username: string;
  fullname: string;

  // constructor
  constructor(private token: TokenStorageService, private logger: NGXLogger) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.username = this.token.getUsername();
    this.fullname = this.token.getUserFullName();
  }
  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }
  logout() {
    this.logger.log('Logging out...');
    this.token.signOut();
    window.location.reload();
  }
}
