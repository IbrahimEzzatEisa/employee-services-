import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Setting } from '../../models/Setting.model';
import { END_POINTS } from './globals/global-config';
import { User, DropdownList, SystemSettings } from '../../models';

const API_URL=END_POINTS.setting;
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http:HttpClient) { }

  get(): Observable<SystemSettings> {
    return this.http.get<SystemSettings>(API_URL);
  }
  // update(model: Setting): Observable<Setting> {
  //   delete model.Bg;
  //   return this.http.put<Setting>(API_URL, model);
  // }
 
  getManagers():Observable<DropdownList[]>{
    const action ='/Managers'
    return this.http.get<DropdownList[]>(API_URL + action)
  }

  update(model: SystemSettings): Observable<SystemSettings> {
    return this.http.put<SystemSettings>(API_URL, model);
  }

}
