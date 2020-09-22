import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DepartureTypes } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.departureTypes;

@Injectable({
  providedIn: 'root'
})
export class DepartureTypesService {

  constructor(private http: HttpClient) { }

  getdepartureTypes(): Observable<DepartureTypes[]> {
    return this.http.get<DepartureTypes[]>(API_URL);
  }

}
