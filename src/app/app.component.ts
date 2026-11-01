import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { SharedModule } from './modules/shared/shared.module';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private logger: NGXLogger) {
   // this.logger.info("Debug message");
    //this.logger.error("Error message for server test");
  }
  title = 'PersonalFinanceMgmtApp';
}
