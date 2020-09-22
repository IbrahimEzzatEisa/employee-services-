import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EmpShift } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';

const API_URL = END_POINTS.empShift;

@Injectable({
  providedIn: 'root'
})
export class EmpShiftService {

  constructor(private http: HttpClient) { }

  getEmpShift(): Observable<EmpShift[]> {
    return this.http.get<EmpShift[]>(API_URL);
  }

}
