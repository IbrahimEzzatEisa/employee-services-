import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { FilterParams, ResultWithPagination, TrxInbox, TrxinboxDetails } from '../../models';
import { Observable } from 'rxjs';


const API_URL = END_POINTS.TrxRequestsBox;


@Injectable({
  providedIn: 'root'
})
export class TrxRequestsBoxService {

  constructor(private http: HttpClient) { }

  getMyInbox(filterParams?: FilterParams):Observable<ResultWithPagination<TrxInbox[]>> {
    const action = '/GetMyInbox'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<TrxInbox[]>>(API_URL+`${action}`, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "TrxID",
        sortDirection: filterParams.sortDirection,
      }
    });
  }
  GetTrxDetails(id : number):Observable<TrxinboxDetails>{
    const action = '/GetTrxDetails/'
    return this.http.get<TrxinboxDetails>(API_URL + action + id)
  }

  

}
