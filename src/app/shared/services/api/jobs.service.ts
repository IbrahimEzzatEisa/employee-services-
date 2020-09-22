import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { Jobs, ResultWithRanking, ResultWithPagination, FilterParams  } from '../../models';


const API_URL = END_POINTS.jobs;

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<Jobs[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<Jobs[]>>(API_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "ID",
        sortDirection: filterParams.sortDirection
      }
    });
  }
  
  create(model: Jobs): Observable<Jobs[]> {
    return this.http.post<Jobs[]>(API_URL, model);
  }
  update( id: number ,model: Jobs): Observable<ResultWithRanking<Jobs>> {
    return this.http.put<ResultWithRanking<Jobs>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Jobs>{
    return this.http.delete<Jobs>(API_URL + `/${id}`);
  }
}
