import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterParams, ResultWithPagination, ResultWithRanking, DocPriority, DropdownList } from '../../models';
import { END_POINTS } from './globals/global-config';

const EtaAPI_URL = END_POINTS.docPriority;
const API_URL = END_POINTS.getIdNameList;

@Injectable({
  providedIn: 'root'
})
export class DocPriorityService {

  constructor(private http: HttpClient) { }

  get(ID: number): Observable<DocPriority> {
    return this.http.get<DocPriority>(EtaAPI_URL + `/${ID}`);
  }

  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<DocPriority[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<DocPriority[]>>(EtaAPI_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || 'ID',
        sortDirection: filterParams.sortDirection
      }
    });
  }
  create(model: DocPriority): Observable<DocPriority> {
    return this.http.post<DocPriority>(EtaAPI_URL, model);
  }
  update(model: DocPriority): Observable<ResultWithRanking<DocPriority>> {
    return this.http.put<ResultWithRanking<DocPriority>>(EtaAPI_URL, model);
  }
  delete(id : string | number): Observable<DocPriority> {
    return this.http.delete<DocPriority>(EtaAPI_URL + `/${id}`);
  }
  GetParents(): Observable<DocPriority[]> {
    const action = '';
    return this.http.get<DocPriority[]>(API_URL + action)
  }
  GetIdNameList(): Observable<DropdownList[]> {
    const action = '/GetIdNameList';
    return this.http.get<DropdownList[]>(EtaAPI_URL + action);
  }

}