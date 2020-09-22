import { Injectable } from '@angular/core';
import { END_POINTS, EtaAPI_URL } from './globals/global-config';
import { FilterParams, ResultWithPagination } from '../../models';
import { Observable } from 'rxjs';
import { Mouad, MouadEdit, MouadRequestBox } from '../../models/mouad.model';
import { HttpClient } from '@angular/common/http';

const API_URL = END_POINTS.MouadRequest;

@Injectable({
  providedIn: 'root'
})
export class MouadService {

  constructor(private http: HttpClient) { }

  GetAllByCurrentUserId(filterParams?: FilterParams): Observable<ResultWithPagination<Mouad[]>> {
    const action = '/GetAllByCurrentUserId';
    if (!filterParams) filterParams = new FilterParams();
    console.log(API_URL);
    return this.http.get<ResultWithPagination<Mouad[]>>( API_URL + action, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || 'MouadId',
        sortDirection: filterParams.sortDirection
      }
    });
  }

  post(model :MouadEdit):Observable<MouadEdit>{
    return this.http.post<MouadEdit>(API_URL , model)
  }
  put(model :MouadEdit):Observable<MouadEdit>{
    return this.http.put<MouadEdit>(API_URL , model)
  }
  GetAllByMouadId(id : string | number):Observable<MouadEdit>{
    const action = '/GetAllByMouadId/'
    return this.http.get<MouadEdit>(API_URL + action + id)
  }
  SearchMouad(model : MouadRequestBox , filterParams:FilterParams):Observable<ResultWithPagination<any[]>>{
    const action ='/SearchMouad';
    return this.http.post<ResultWithPagination<any[]>>(API_URL + action , model ,{
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "MouadId",
        sortDirection: filterParams.sortDirection
      }
    });
    
  }
  AcceptRefuseRequest(model : any):Observable<any>{
    const action ='/AcceptRefuseRequest';
    return this.http.post<any>(API_URL + action , model)
  }

}
