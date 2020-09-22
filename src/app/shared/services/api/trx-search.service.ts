import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { TrxSearch, FilterParams, ResultWithPagination, TrxSearchResult } from '../../models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.TrxSearch;

@Injectable({
  providedIn: 'root'
})
export class TrxSearchService {

  constructor(private http: HttpClient) { }

  post(model : TrxSearch ,filterParams?: FilterParams):Observable<ResultWithPagination<TrxSearchResult[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "Serial",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }

}
