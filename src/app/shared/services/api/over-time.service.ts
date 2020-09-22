import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OverTime } from '../../models/over-time.model';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { User, PayrollData, FilterParams, ResultWithPagination } from '../../models';
import { DateService } from '../date.service';

const API_URL = END_POINTS.OverTime;


@Injectable({
  providedIn: 'root'
})
export class OverTimeService {

  constructor(private http: HttpClient, private dateService: DateService) {
  }

  post(model: OverTime): Observable<{message:string}> {
    return this.http.post<{message:string}>(API_URL, model);
  }
  GetEmployees(): Observable<User[]> {
    const action = "/GetEmployees"
    return this.http.get<User[]>(API_URL + action);
  }
  GetPayrollData(id: number,FromDate: string, ToDate: string): Observable<PayrollData[]> {
    this.dateService.getCurrentHijriYear();

    const action = "/GetPayrollData/"
    return this.http.post<PayrollData[]>(API_URL + action + id, { FromDate, ToDate }, {
      params:
      {
        year: this.dateService.getCurrentHijriYear()
      }
    });
  }

  SearchOverTime(model : any ,filterParams?: FilterParams):Observable<ResultWithPagination<any[]>> {
    const action = 'SearchOverTime'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL+`/${action}`, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "OutOfDutyGroupSerial",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }


}
