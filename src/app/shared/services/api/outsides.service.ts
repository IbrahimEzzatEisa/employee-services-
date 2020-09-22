import { Injectable } from '@angular/core';
import { FilterParams, ResultWithPagination, Department, OutsideDDl, Outsides, DropdownList } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';


const EtaAPI_URL = END_POINTS.outsides;

@Injectable({
  providedIn: 'root'
})
export class OutsidesService {
  constructor(private http: HttpClient) { }



  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<Outsides[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<Outsides[]>>(EtaAPI_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "ID",
        sortDirection: filterParams.sortDirection
      }
    });
  } 
  GetIdNameList():Observable<DropdownList[]>{
    const action = '/GetIdNameList';
    return this.http.get<DropdownList[]>(EtaAPI_URL + action);
  }
  post(model : any):Observable<any>{
    return this.http.post<any>(EtaAPI_URL , model);
  }
}
