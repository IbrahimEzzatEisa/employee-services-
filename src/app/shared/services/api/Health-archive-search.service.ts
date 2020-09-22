import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import {  FilterParams, ResultWithPagination, DropdownList } from '../../models';
import { Observable } from 'rxjs';
import { HealthArchiveSearch, HealthArchiveSearchResult } from '../../models/Health-Archive-Search.model';
const API_URL = END_POINTS.HealthArchiveSearch;

@Injectable({
  providedIn: 'root'
})
export class HealthArchiveSearchService {

  constructor(private http: HttpClient) { }

  post(model : HealthArchiveSearch ,filterParams?: FilterParams):Observable<ResultWithPagination<HealthArchiveSearchResult[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "ArchiveHealthID",
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
