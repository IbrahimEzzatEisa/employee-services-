import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterParams, ResultWithRanking, ResultWithPagination, News } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';

const EtaAPI_URL = END_POINTS.news;

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http: HttpClient) { }

  get(id: string | number): Observable<News> {
    return this.http.get<News>(EtaAPI_URL + `/${id}`);
  }

  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<News[]>> {
    if (!filterParams) { filterParams = new FilterParams(); }
    return this.http.get<ResultWithPagination<News[]>>(EtaAPI_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "NewsID",
        sortDirection: filterParams.sortDirection
      }
    });
  }
  create(model: News): Observable<News> {
    return this.http.post<News>(EtaAPI_URL, model);
  }
  update(model: News): Observable<ResultWithRanking<News>> {
    return this.http.put<ResultWithRanking<News>>(EtaAPI_URL, model);
  }
  delete(id): Observable<News> {
    return this.http.delete<News>(EtaAPI_URL + `/${id}`);
  }

}
