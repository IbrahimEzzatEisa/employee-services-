import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { FilterParams, ResultWithRanking, ResultWithPagination, Alternatives } from 'src/app/shared/models';



    const API_URL = END_POINTS.alternatives;

@Injectable({
  providedIn: 'root'
})
export class AlternativesService {

  constructor(private http: HttpClient) { }

  get(id: string | number): Observable<ResultWithRanking<Alternatives>> {
    return this.http.get<ResultWithRanking<Alternatives>>(API_URL + `/${id}`);
  }

  getAll(filterParams?: FilterParams):Observable<ResultWithPagination<Alternatives[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<Alternatives[]>>(API_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "UserID",
        sortDirection: filterParams.sortDirection
      }
    });
  }
  getAllAlternatives(): Observable<Alternatives[]> {
    return this.http.get<Alternatives[]>(API_URL);
  }
}
