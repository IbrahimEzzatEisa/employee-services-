import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import {  FilterParams, ResultWithPagination, DropdownList } from '../../models';
import { Observable } from 'rxjs';
import { RealStateArchiveSearch, RealStateArchiveSearchResult } from '../../models/RealState-Archive-Search.model';

const API_URL = END_POINTS.RealStateArchiveSearch;

@Injectable({
  providedIn: 'root'
})
export class RealStateArchiveSearchService {

  constructor(private http: HttpClient) { }

  post(model : RealStateArchiveSearch ,filterParams?: FilterParams):Observable<ResultWithPagination<RealStateArchiveSearchResult[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "ArchiveRealStateID",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }
  GetDepartments(): Observable<DropdownList[]> {
    
    return this.http.get<DropdownList[]>(END_POINTS.departmentsIDName )
  }
 
  GetDepartmentEmployees(depaermentID:number): Observable<DropdownList[]> {
   
    return this.http.get<DropdownList[]>(END_POINTS.departmentUsersIDName  + depaermentID)
  }
}
