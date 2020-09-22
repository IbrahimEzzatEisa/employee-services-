import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { Training, ResultWithRanking, FilterParams, ResultWithPagination, Permission } from '../../models';
import { Action } from 'rxjs/internal/scheduler/Action';

const API_URL = END_POINTS.training;

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient) { }
  create(model: Training): Observable<Training> {
    return this.http.post<Training>(API_URL, model);
  }
  update(id, model: Training): Observable<ResultWithRanking<Training>> {
    return this.http.put<ResultWithRanking<Training>>(API_URL + `/${id}`, model);
  }
  delete(id): Observable<Training> {
    return this.http.delete<Training>(API_URL + `/${id}`);
  }
 

  SearchTraining(model : any ,filterParams?: FilterParams):Observable<ResultWithPagination<any[]>> {
    const action = 'SearchTraining'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL+`/${action}`, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "TrainingId",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }

}

