import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FilterParams, ResultWithRanking,Departure, ResultWithPagination } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.departure;

@Injectable({
  providedIn: 'root'
})
export class DepartureService {

  constructor(private http: HttpClient) { }

  getAll(filterParams?: FilterParams): Observable<Departure[]> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<Departure[]>(API_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField,
        sortDirection: filterParams.sortDirection
      }
    });
  }
  create(model: Departure): Observable<Departure> {
    return this.http.post<Departure>(API_URL, model);
  }
  update(id:number, model: Departure): Observable<ResultWithRanking<Departure>> {
    return this.http.put<ResultWithRanking<Departure>>(API_URL + `/${id}`, model);
  }
  delete(id:number): Observable<Departure> {
    return this.http.delete<Departure>(API_URL + `/${id}`);
  }

  
  SearchDeparture(model : any ,filterParams?: FilterParams):Observable<ResultWithPagination<any[]>> {
    const action = 'SearchDeparture'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL+`/${action}`, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "DepartureID",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }


}
