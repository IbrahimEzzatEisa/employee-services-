import { Injectable } from '@angular/core';
import { FilterParams, ResultWithPagination, ResultWithRanking, MaintenanceBox } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { END_POINTS } from './globals/global-config';

const API_URL = END_POINTS.maintenanceBox;

@Injectable({
  providedIn: 'root'
})
export class MaintenanceBoxService {

  constructor(private http: HttpClient) { }

  getAll(id,filterParams?: FilterParams ): Observable<ResultWithPagination<MaintenanceBox[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<MaintenanceBox[]>>(API_URL + `/${id}`, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "MaintenanceID",
        sortDirection: filterParams.sortDirection
      }
    });
    
  }

}
