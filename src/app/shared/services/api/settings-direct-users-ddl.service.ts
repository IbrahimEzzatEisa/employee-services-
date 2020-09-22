 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { ResultWithRanking, FilterParams, ResultWithPagination } from '../../models';
 import { Observable } from 'rxjs';
 import { END_POINTS } from './globals/global-config';

 const API_URL = END_POINTS.settingsDirectUsersDdl;

 @Injectable({
   providedIn: 'root'
 })
 export class SettingsDirectUsersDdlService {

 
   constructor(private http: HttpClient) { }

  //  get(id: number): Observable<ResultWithRanking<SettingsDirectUsersDdl>> {
  //    return this.http.get<ResultWithRanking<SettingsDirectUsersDdl>>(API_URL+`/${id}`);
  //  }

  //  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<SettingsDirectUsersDdl[]>> {
  //    filterParams = filterParams || new FilterParams();
  //    return this.http.get<ResultWithPagination<SettingsDirectUsersDdl[]>>(API_URL, {
  //      params: {
  //        pageNumber: filterParams.pageNumber.toString(),
  //        pageSize: filterParams.pageSize.toString(),
  //        searchValue: filterParams.searchValue,
  //        sortField: filterParams.sortField || 'id',
  //        sortDirection: filterParams.sortDirection
  //      }
  //    });
  //  }


  //  getSettingsDirectUsersDdl(): Observable<SettingsDirectUsersDdl[]> {
  //    return this.http.get<SettingsDirectUsersDdlService[]>(API_URL);
  //  }
  }
