import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeInfo } from '../../models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.employeeInfo;
@Injectable({
  providedIn: 'root'
})
export class EmployeeInfoService {

  constructor(private http: HttpClient) { }


get(PayrollEmpID: number): Observable<EmployeeInfo[]> {
  return this.http.get<EmployeeInfo[]>(API_URL+`/${PayrollEmpID}`);
}

}