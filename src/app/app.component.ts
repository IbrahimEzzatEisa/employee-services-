import { Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <notifier-container></notifier-container>
  <ngx-spinner name="sp5" [fullScreen]="false" type="square-jelly-box" size="medium"></ngx-spinner>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'etasystem2020';
  /**
   *
   */
  constructor(private wowService: NgwWowService) {
    this.wowService.init();
  }
}

