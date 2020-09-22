import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  FilterParams, ResultWithRanking, ResultWithPagination, WorkFlow, WorkFlows } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';

const API_URL = END_POINTS.workflow;
const API = END_POINTS.workflows;



@Injectable({
  providedIn: 'root'
})
export class WorkFlowService {

  constructor(private http: HttpClient) { }

  get(id: string | number): Observable<WorkFlow[]> {
    return this.http.get<WorkFlow[]>(API_URL + `/${id}`);
  }

  // getAll(filterParams?: FilterParams): Observable<ResultWithPagination<WorkFlow[]>> {
  //   if (!filterParams) filterParams = new FilterParams();
  //   return this.http.get<ResultWithPagination<WorkFlow[]>>(API_URL, {
  //     params: {
  //       pageNumber: filterParams.pageNumber.toString(),
  //       pageSize: filterParams.pageSize.toString(),
  //       searchValue: filterParams.searchValue,
  //       sortField: filterParams.sortField || "UserID",
  //       sortDirection: filterParams.sortDirection
  //     }
      
  //   });

  // }

  getAll(): Observable<WorkFlow[]> {
    return this.http.get<WorkFlow[]>(API_URL);
  }
  create(model: WorkFlows): Observable<WorkFlows[]> {
    return this.http.post<WorkFlows[]>(API, model);
  }
  update( id: number ,model: WorkFlows): Observable<ResultWithRanking<WorkFlows>> {
    return this.http.put<ResultWithRanking<WorkFlows>>(API +`/${id}`, model);
  }
  delete(id): Observable<WorkFlow>{
    return this.http.delete<WorkFlow>(API + `/${id}`);
  }

}
