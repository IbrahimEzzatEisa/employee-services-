import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Legation, User, EmployeeInformation, FilterParams, ResultWithPagination } from '../../models';


const API_URL = END_POINTS.legation;


@Injectable({
  providedIn: 'root'
})
export class LegationService {
  
  constructor(private http: HttpClient) {
  }

  post(model : Legation): Observable<Legation> {
    return this.http.post<Legation>(API_URL , model);
  }
  GetEmployees():Observable<User[]>{
    const action = "/GetEmployees"
      return this.http.get<User[]>(API_URL + action);
  }
  GetEmployeeInfo(id : number) : Observable<EmployeeInformation[]>{
    const action = "/GetEmployeeInfo"
      return this.http.get<EmployeeInformation[]>(API_URL + action + `/${id}`);
  }


  SearchLegation(model : any ,filterParams?: FilterParams):Observable<ResultWithPagination<any[]>> {
    const action = 'SearchLegation'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL+`/${action}`, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "ID",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }
  
}
