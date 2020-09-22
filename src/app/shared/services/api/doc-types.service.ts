import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterParams, ResultWithPagination, ResultWithRanking, DocTypes, DropdownList } from '../../models';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';

const EtaAPI_URL = END_POINTS.docTypes;
const API_URL = END_POINTS.getIdNameList;

@Injectable({
  providedIn: 'root'
})
export class DocTypesService {

  constructor(private http: HttpClient) { }

  get(ID: number): Observable<DocTypes> {
    return this.http.get<DocTypes>(EtaAPI_URL + `/${ID}`);
  }

  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<DocTypes[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<DocTypes[]>>(EtaAPI_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || 'ID',
        sortDirection: filterParams.sortDirection
      }
    });
  }
  create(model: DocTypes): Observable<DocTypes> {
    return this.http.post<DocTypes>(EtaAPI_URL, model);
  }
  update(model: DocTypes): Observable<ResultWithRanking<DocTypes>> {
    return this.http.put<ResultWithRanking<DocTypes>>(EtaAPI_URL, model);
  }
  delete(id : string | number): Observable<DocTypes> {
    return this.http.delete<DocTypes>(EtaAPI_URL + `/${id}`);
  }


  GetParents(): Observable<DocTypes[]> {
  
    const action = '';
    return this.http.get<DocTypes[]>(API_URL + action)
  }
  GetIdNameList(): Observable<DropdownList[]> {
    return this.http.get<DropdownList[]>( API_URL)
  }


}