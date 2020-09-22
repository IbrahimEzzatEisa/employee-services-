import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';

import { DateService } from 'src/app/shared/services/date.service';
import { SettingsService} from './api/settings.service';

const session_items_year = "session_items_year";

@Injectable({
  providedIn: 'root'
})
export class SharedSettingsService {

  appSettings;
 
  constructor( 
    private settingsService: SettingsService,
    private dateService: DateService
    ) {
  }

  // refreshAppSettings() {
  //   if(!this.appSettings)
  //     this.appSettings = new BehaviorSubject({});
  //   this.settingsService.get().subscribe(
  //     settings => {
  //       this.appSettings.next(settings);
  //     }
  //   );
  // }

  getSettings() {
    return this.appSettings.asObservable();
  }

  getSessionYear(): string {
    try {
      var sessionItemsYear = localStorage.getItem(session_items_year);
    } catch(err) {
      var sessionItemsYear = this.dateService.getCurrentHijriYear()
    }
    return sessionItemsYear || this.dateService.getCurrentHijriYear();
  }
  getSessionYearNumber(): number {
    return Number.parseInt(this.getSessionYear());
  }
  setSessionYear(year: string) {
    localStorage.setItem(session_items_year, year);
  }
  resetSessionSettings() {
    localStorage.removeItem(session_items_year);
  }

}
