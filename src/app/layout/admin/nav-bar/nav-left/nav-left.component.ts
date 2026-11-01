// Angular Import
import { Component, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit, OnDestroy {
  currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  private $inActive=new Subject<boolean>();
  
  ngOnInit(): void {
    this.startClock();
  }
  startClock() {
    //to subscribe this
    interval(1).pipe(takeUntil(this.$inActive)).subscribe(()=>{
      this.currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    })
  }
  ngOnDestroy(): void {
    this.$inActive.next(true);
    this.$inActive.unsubscribe();
  }
}
