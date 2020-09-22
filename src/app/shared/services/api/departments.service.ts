import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {  FilterParams, ResultWithRanking, ResultWithPagination, Department, Pergroup, DepartmentManagersUsers, DepartmentDropdown } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';

const API_URL = END_POINTS.user;
const EtaAPI_URL = END_POINTS.department;
const departmentManagersUsers = END_POINTS.departmentManagersUsers;

@Injectable({
  providedIn: 'root'
})
export class departmentsService {

  constructor(private http: HttpClient) { }

  get(id: string | number): Observable<Department> {
    return this.http.get<Department>(EtaAPI_URL + `/${id}`);
  }

  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<Department[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<Department[]>>(EtaAPI_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "DepartmentID",
        sortDirection: filterParams.sortDirection
      }
    });
  }
  create(model: Department): Observable<Department> {
    return this.http.post<Department>(EtaAPI_URL, model);
  }
  update(model: Department): Observable<ResultWithRanking<Department>> {
    return this.http.put<ResultWithRanking<Department>>(EtaAPI_URL , model);
  }
  delete(id): Observable<Department>{
    return this.http.delete<Department>(EtaAPI_URL + `/${id}`);
  }


  GetParents(): Observable<Department[]> {
    const action = '/GetDepartments';
    return this.http.get<Department[]>(API_URL + action)

  }
  GetDepartmentManagersUsers():Observable<any[]>{
    return this.http.get<DepartmentManagersUsers[]>(departmentManagersUsers)
  }
  // غلط لازم تتصلح
  GetIdNameList():Observable<any>{
    const action = '/GetIdNameList';
    return this.http.get<DepartmentManagersUsers[]>(EtaAPI_URL + action)
  }

  getDepartmentList(): Observable<DepartmentDropdown[]>{
    const action = '/GetIdNameList';
    return this.http.get<DepartmentDropdown[]>(EtaAPI_URL + action)
  }

}