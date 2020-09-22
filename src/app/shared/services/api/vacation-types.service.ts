import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { FilterParams, ResultWithPagination, ResultWithRanking, VacationTypes } from 'src/app/shared/models';


const API_URL = END_POINTS.vacationTypes;


@Injectable({
  providedIn: 'root'
})
export class VacationTypesService {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<ResultWithRanking<VacationTypes>> {
    return this.http.get<ResultWithRanking<VacationTypes>>(API_URL+`/${id}`);
  }

  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<VacationTypes[]>> {
    filterParams = filterParams || new FilterParams();
    return this.http.get<ResultWithPagination<VacationTypes[]>>(API_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || 'VacationTypeID',
        sortDirection: filterParams.sortDirection
      }
    });
  }

  // getVactionsById(): Observable<VacationTypes[]> {
  //   return this.http.get<VacationTypes[]>(API_URL);
  // }
  getVactionTypes(): Observable<VacationTypes[]> {
    return this.http.get<VacationTypes[]>(API_URL);
  }


}
