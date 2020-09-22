import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import {  FilterParams, ResultWithPagination, DropdownList } from '../../models';
import { Observable } from 'rxjs';
import { LicenseArchiveSearch, LicenseArchiveSearchResult } from '../../models/License-Archive-Search.model';

const API_URL = END_POINTS.LicenseArchiveSearch;

@Injectable({
  providedIn: 'root'
})
export class LicenseArchiveSearchService {

  constructor(private http: HttpClient) { }

  post(model : LicenseArchiveSearch ,filterParams?: FilterParams):Observable<ResultWithPagination<LicenseArchiveSearchResult[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "ArchiveLicenseID",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }
  GetDepartments(): Observable<DropdownList[]> {
    
    return this.http.get<DropdownList[]>(END_POINTS.departmentsIDName )
  }
  GetTypes(): Observable<DropdownList[]> {
    
    return this.http.get<DropdownList[]>(END_POINTS.LicenseArchiveSearchTypes )
  }
  GetDepartmentEmployees(depaermentID:number): Observable<DropdownList[]> {
   
    return this.http.get<DropdownList[]>(END_POINTS.departmentUsersIDName  + depaermentID)
  }
}
